<script lang="ts" module>
	import { tv, type VariantProps } from "tailwind-variants";

	export const buttonGroupVariants = tv({
		base: "relative inline-flex items-center rounded-full overflow-hidden transition-colors duration-200 border border-transparent shadow-sm select-none outline-none focus-visible:ring-3 focus-visible:ring-ring/50 backdrop-blur-sm select-none",
		variants: {
			variant: {
				prominent: "bg-primary/90 text-primary-foreground border-transparent",
				bordered: "bg-background/90 text-primary-foreground border-border",
				secondary: "bg-secondary/90 text-secondary-foreground border-transparent",
				translucent: "bg-muted/60 text-foreground border-transparent",
				ghost: "bg-transparent text-foreground border-transparent",
				destructive: "bg-destructive/90 text-foreground border-transparent",
			},
			size: {
				default: "h-10 gap-1",
				xs: "h-6 gap-0.5",
				sm: "h-8 gap-1",
				lg: "h-12 gap-1.5",
			},
		},
		defaultVariants: {
			variant: "translucent",
			size: "default",
		},
	});

	export type ButtonGroupVariant = VariantProps<typeof buttonGroupVariants>["variant"];
	export type ButtonGroupSize = VariantProps<typeof buttonGroupVariants>["size"];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { onDestroy, setContext } from "svelte";

	type Props = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: ButtonGroupVariant;
		size?: ButtonGroupSize;
		specular?: boolean;
		specularAngle?: number;
		scale?: boolean;
		magnetic?: boolean;
		liquidGlass?: boolean;
		refractiveIndex?: number;
		bezelWidth?: number;
		displacementScale?: number;
		surfaceProfile?: "circle" | "squircle" | "concave" | "lip";
		chromaticAberration?: boolean;
		saturationBoost?: number;
		backgroundBlur?: number;
	};

	let {
		ref = $bindable(null),
		class: className,
		children,
		variant = "translucent",
		size = "default",
		specular = true,
		specularAngle = undefined,
		scale = true,
		magnetic = true,
		style,
		liquidGlass = false,
		refractiveIndex = 1.5,
		bezelWidth = 20,
		displacementScale = 40,
		surfaceProfile = "squircle",
		chromaticAberration = false,
		saturationBoost = 1.3,
		backgroundBlur = 0.3,
		...props
	}: Props = $props();

	import { createLiquidGlass, LiquidGlassFilter } from "$lib/components/ui/glass-view/index.js";

	const lgState = createLiquidGlass(() => ({
		liquidGlass,
		refractiveIndex,
		bezelWidth,
		displacementScale,
		surfaceProfile,
		chromaticAberration,
		saturationBoost,
		backgroundBlur
	}));

	$effect(() => {
		lgState.ref = ref;
	});

	setContext("in-button-group", true);

	let hoverAngle = $state<number | null>(null);
	let ripples = $state<{ id: number; x: number; y: number; size: number; isReleased: boolean }[]>([]);
	let nextRippleId = 0;
	let currentActiveRippleId = $state<number | null>(null);
	let isDraggingGroup = $state(false);

	let inputTranslateX = $state(0);
	let inputTranslateY = $state(0);
	let inputScaleX = $state(1);
	let inputScaleY = $state(1);
	let inputRect = $state<DOMRect | null>(null);

	function handlePointerMove(e: PointerEvent) {
		if (currentActiveRippleId !== null || isDraggingGroup) return;
		const target = e.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const cx = rect.left + rect.width / 2;
		const cy = rect.top + rect.height / 2;
		const dx = e.clientX - cx;
		const dy = e.clientY - cy;
		const angleRad = Math.atan2(dy, dx);
		const angleDeg = angleRad * (180 / Math.PI);
		hoverAngle = angleDeg + 270;
	}

	function handlePointerMoveWindow(e: PointerEvent) {
		if (!inputRect) return;

		const x = e.clientX - inputRect.left;
		const y = e.clientY - inputRect.top;

		if (currentActiveRippleId !== null) {
			ripples = ripples.map((r) => {
				if (r.id === currentActiveRippleId) {
					return { ...r, x, y };
				}
				return r;
			});
		}

		const cx = inputRect.left + inputRect.width / 2;
		const cy = inputRect.top + inputRect.height / 2;
		const dx = e.clientX - cx;
		const dy = e.clientY - cy;
		const angleRad = Math.atan2(dy, dx);
		const angleDeg = angleRad * (180 / Math.PI);
		hoverAngle = angleDeg + 270;

		if (magnetic || scale) {
			const rx = inputRect.width / 2;
			const ry = inputRect.height / 2;
			const offX = x - rx;
			const offY = y - ry;
			const distance = Math.sqrt(offX * offX + offY * offY);

			if (scale) {
				inputScaleX = 1.05;
				inputScaleY = 1.05;
			}

			if (distance > 0) {
				if (magnetic) {
					const maxPull = 26;
					const pullStrength = 0.14;
					const pullX = (offX / distance) * Math.min(distance * pullStrength, maxPull);
					const pullY = (offY / distance) * Math.min(distance * pullStrength, maxPull);

					inputTranslateX = pullX;
					inputTranslateY = pullY;
				}

				if (scale) {
					const stretchFactor = 0.008;
					const activeTranslateX = magnetic ? inputTranslateX : offX;
					const activeTranslateY = magnetic ? inputTranslateY : offY;
					inputScaleX = Math.max(0.95, 1.05 + Math.abs(activeTranslateX) * stretchFactor - Math.abs(activeTranslateY) * 0.004);
					inputScaleY = Math.max(0.95, 1.05 + Math.abs(activeTranslateY) * stretchFactor - Math.abs(activeTranslateX) * 0.004);
				}
			}
		}
	}

	function handlePointerDown(e: PointerEvent) {
		const target = e.target as HTMLElement;
		if (e.pointerType === "mouse" && e.button !== 0) return;

		const currentTarget = e.currentTarget as HTMLElement;
		const rect = currentTarget.getBoundingClientRect();
		inputRect = rect;
		isDraggingGroup = true;

		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const size = Math.max(rect.width, rect.height) * 2.5;

		const id = nextRippleId++;
		const newRipple = { id, x, y, size, isReleased: false };
		ripples.push(newRipple);
		currentActiveRippleId = id;

		if (scale) {
			inputScaleX = 1.05;
			inputScaleY = 1.05;
		}

		if (magnetic || scale) {
			const rx = rect.width / 2;
			const ry = rect.height / 2;
			const offX = x - rx;
			const offY = y - ry;
			const distance = Math.sqrt(offX * offX + offY * offY);

			if (distance > 0) {
				if (magnetic) {
					const pullX = (offX / distance) * Math.min(distance * 0.16, 20);
					const pullY = (offY / distance) * Math.min(distance * 0.16, 20);
					inputTranslateX = pullX;
					inputTranslateY = pullY;
				}

				if (scale) {
					const stretchFactor = 0.008;
					const activeTranslateX = magnetic ? inputTranslateX : offX;
					const activeTranslateY = magnetic ? inputTranslateY : offY;
					inputScaleX = Math.max(0.95, 1.05 + Math.abs(activeTranslateX) * stretchFactor - Math.abs(activeTranslateY) * 0.004);
					inputScaleY = Math.max(0.95, 1.05 + Math.abs(activeTranslateY) * stretchFactor - Math.abs(activeTranslateX) * 0.004);
				}
			}
		}

		if (typeof window !== "undefined") {
			window.addEventListener("pointermove", handlePointerMoveWindow);
			window.addEventListener("pointerup", handleRelease);
			window.addEventListener("pointercancel", handleRelease);
		}
	}

	function handleRelease() {
		ripples = ripples.map((r) => {
			if (!r.isReleased) {
				const rid = r.id;
				setTimeout(() => {
					ripples = ripples.filter((rip) => rip.id !== rid);
				}, 450);
				return { ...r, isReleased: true };
			}
			return r;
		});

		currentActiveRippleId = null;
		isDraggingGroup = false;
		inputRect = null;

		inputTranslateX = 0;
		inputTranslateY = 0;
		inputScaleX = 1;
		inputScaleY = 1;

		if (typeof window !== "undefined") {
			window.removeEventListener("pointermove", handlePointerMoveWindow);
			window.removeEventListener("pointerup", handleRelease);
			window.removeEventListener("pointercancel", handleRelease);
		}
	}

	function handleMouseLeave() {
		if (currentActiveRippleId === null && !isDraggingGroup) {
			hoverAngle = null;
		}
	}

	function triggerTransition(node: HTMLElement) {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				node.classList.add("is-holding");
			});
		});
	}

	onDestroy(() => {
		if (typeof window !== "undefined") {
			window.removeEventListener("pointermove", handlePointerMoveWindow);
			window.removeEventListener("pointerup", handleRelease);
			window.removeEventListener("pointercancel", handleRelease);
		}
	});

	let showSpecular = $derived(specular || specularAngle !== undefined);
	let activeAngle = $derived(hoverAngle !== null ? hoverAngle : (specularAngle ?? -45));

	let transformParts = $derived.by(() => {
		if (!isDraggingGroup && currentActiveRippleId === null) return [];
		const parts: string[] = [];
		if (magnetic) {
			parts.push(`translate3d(${inputTranslateX}px, ${inputTranslateY}px, 0)`);
		} else {
			parts.push(`translate3d(0, 0, 0)`);
		}
		if (scale) {
			parts.push(`scale(${inputScaleX}, ${inputScaleY})`);
		} else {
			parts.push(`scale(1)`);
		}
		return parts;
	});

	let transformStyle = $derived(transformParts.length > 0 ? `transform: ${transformParts.join(" ")};` : "");

	let inputGroupStyle = $derived(`${style ?? ""}; ${showSpecular ? `--specular-angle: ${activeAngle}deg;` : ""} ${transformStyle}; ${lgState.backdropStyle}`);
</script>

<div
	bind:this={ref}
	role="group"
	data-slot="button-group"
	class={cn(buttonGroupVariants({ variant, size }), showSpecular && "button-group-specular-container", className)}
	style={inputGroupStyle}
	onpointermove={handlePointerMove}
	onpointerdown={handlePointerDown}
	onmouseleave={handleMouseLeave}
	{...props}
>
	<div class="ripple-container">
		{#each ripples as ripple (ripple.id)}
			<div use:triggerTransition class="ripple" class:is-released={ripple.isReleased} style="left: {ripple.x}px; top: {ripple.y}px; width: {ripple.size}px; height: {ripple.size}px;"></div>
		{/each}
	</div>
	{@render children?.()}
	{#if showSpecular}
		<div class="button-group-specular pointer-events-none absolute inset-0 rounded-full z-20"></div>
	{/if}
</div>

{#if liquidGlass && lgState.isChromium && lgState.displacementMapUri}
	<LiquidGlassFilter
		filterId={lgState.filterId}
		displacementMapUri={lgState.displacementMapUri}
		specularMapUri={lgState.specularMapUri}
		width={lgState.width}
		height={lgState.height}
		displacementScale={displacementScale}
		saturationBoost={saturationBoost}
		backgroundBlur={backgroundBlur}
		chromaticAberration={chromaticAberration}
	/>
{/if}

<style>
	@property --specular-angle {
		syntax: "<angle>";
		inherits: true;
		initial-value: -45deg;
	}

	.button-group-specular-container {
		position: relative;
	}

	.button-group-specular {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		padding: 1px;
		background: linear-gradient(var(--specular-angle, -45deg), rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 15%, rgba(255, 255, 255, 0) 85%, rgba(255, 255, 255, 0.15) 94%);
		-webkit-mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask:
			linear-gradient(#fff 0 0) content-box exclude,
			linear-gradient(#fff 0 0);
		mask-composite: exclude;
		mix-blend-mode: plus-lighter;
		transition: --specular-angle 0.4s cubic-bezier(0.16, 1, 0.3, 1);
		pointer-events: none;
	}

	:global(div[data-slot="button-group"]:hover) .button-group-specular {
		transition: none;
	}

	.ripple-container {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		border-radius: inherit;
		z-index: 0;
	}

	.ripple {
		position: absolute;
		transform: translate(-50%, -50%) scale(0.4);
		opacity: 0;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 70%);
		pointer-events: none;
		mix-blend-mode: plus-lighter;
		filter: blur(14px);
		transition:
			transform 1.2s cubic-bezier(0.1, 0.8, 0.2, 1),
			opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1),
			left 0.15s cubic-bezier(0.25, 1, 0.5, 1),
			top 0.15s cubic-bezier(0.25, 1, 0.5, 1);
	}

	.ripple:global(.is-holding) {
		transform: translate(-50%, -50%) scale(0.65);
		opacity: 1;
	}

	.ripple:global(.is-holding.is-released) {
		transform: translate(-50%, -50%) scale(1.4);
		opacity: 0;
		transition:
			transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
			opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1);
	}

	:global(div[data-slot="button-group"]) {
		transition:
			transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
			background-color 0.2s,
			border-color 0.2s;
		-webkit-mask-image: -webkit-radial-gradient(white, black);
		mask-image: radial-gradient(white, black);
	}
</style>
