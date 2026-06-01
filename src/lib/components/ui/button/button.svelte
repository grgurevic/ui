<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const buttonVariants = tv({
		base: "select-none cursor-pointer focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-3 aria-invalid:ring-3 [&_svg:not([class*='size-'])]:size-4 group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 rounded-full transform-gpu grow-0 relative overflow-hidden backdrop-blur-sm",
		variants: {
			variant: {
				prominent: "bg-primary/90 text-primary-foreground hover:bg-primary",
				bordered: "bg-background/90 text-primary-foreground hover:bg-background aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
				secondary: "bg-secondary/90 text-secondary-foreground hover:bg-secondary aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
				translucent: "bg-muted/60 hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground",
				ghost: "hover:bg-muted/10 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
				destructive: "bg-destructive/90 hover:bg-destructive text-foreground focus-visible:border-destructive/40 dark:hover:bg-destructive/60",
			},
			size: {
				xs: "h-6 gap-1 rounded-full px-2 text-xs in-data-[slot=button-group]:rounded-full has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
				sm: "h-8 gap-1.5 rounded-full px-2.5 in-data-[slot=button-group]:rounded-full has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
				default: "h-10 gap-2 px-3 in-data-[slot=button-group]:rounded-full has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
				lg: "h-12 gap-3 px-4 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
				icon: "size-10",
				"icon-xs": "size-6 rounded-full in-data-[slot=button-group]:rounded-full [&_svg:not([class*='size-'])]:size-3",
				"icon-sm": "size-8 rounded-full in-data-[slot=button-group]:rounded-full",
				"icon-lg": "size-12",
			},
		},
		defaultVariants: {
			variant: "prominent",
			size: "default",
		},
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
	export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
			specular?: boolean;
			specularAngle?: number;
			scale?: boolean;
			magnetic?: boolean;
		};
</script>

<script lang="ts">
	import { onDestroy, getContext } from "svelte";

	const inButtonGroup = getContext<boolean>("in-button-group") || false;

	let {
		class: className,
		variant = "prominent",
		size = "default",
		ref = $bindable(null),
		href = undefined,
		type = "button",
		disabled,
		specular = true,
		specularAngle = undefined,
		scale = true,
		magnetic = true,
		style,
		children,
		...restProps
	}: ButtonProps = $props();

	let isMagnetic = $derived(inButtonGroup ? false : magnetic);
	let isScale = $derived(inButtonGroup ? false : scale);
	let isSpecular = $derived(inButtonGroup ? false : specular);

	let hoverAngle = $state<number | null>(null);
	let ripples = $state<{ id: number; x: number; y: number; size: number; isReleased: boolean }[]>([]);
	let nextRippleId = 0;
	let currentActiveRippleId = $state<number | null>(null);

	let buttonTranslateX = $state(0);
	let buttonTranslateY = $state(0);
	let buttonScaleX = $state(1);
	let buttonScaleY = $state(1);
	let buttonRect = $state<DOMRect | null>(null);

	function handlePointerMove(e: PointerEvent) {
		if (inButtonGroup) return;
		if (currentActiveRippleId !== null) return;
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
		if (currentActiveRippleId === null || !buttonRect) return;

		const x = e.clientX - buttonRect.left;
		const y = e.clientY - buttonRect.top;

		ripples = ripples.map((r) => {
			if (r.id === currentActiveRippleId) {
				return { ...r, x, y };
			}
			return r;
		});

		const cx = buttonRect.left + buttonRect.width / 2;
		const cy = buttonRect.top + buttonRect.height / 2;
		const dx = e.clientX - cx;
		const dy = e.clientY - cy;
		const angleRad = Math.atan2(dy, dx);
		const angleDeg = angleRad * (180 / Math.PI);
		hoverAngle = angleDeg + 270;

		if (isMagnetic || isScale) {
			const rx = buttonRect.width / 2;
			const ry = buttonRect.height / 2;
			const offX = x - rx;
			const offY = y - ry;
			const distance = Math.sqrt(offX * offX + offY * offY);

			if (isScale) {
				buttonScaleX = 1.05;
				buttonScaleY = 1.05;
			}

			if (distance > 0) {
				if (isMagnetic) {
					const maxPull = 26;
					const pullStrength = 0.14;
					const pullX = (offX / distance) * Math.min(distance * pullStrength, maxPull);
					const pullY = (offY / distance) * Math.min(distance * pullStrength, maxPull);

					buttonTranslateX = pullX;
					buttonTranslateY = pullY;
				}

				if (isScale) {
					const stretchFactor = 0.008;
					const activeTranslateX = isMagnetic ? buttonTranslateX : offX;
					const activeTranslateY = isMagnetic ? buttonTranslateY : offY;
					buttonScaleX = Math.max(0.95, 1.05 + Math.abs(activeTranslateX) * stretchFactor - Math.abs(activeTranslateY) * 0.004);
					buttonScaleY = Math.max(0.95, 1.05 + Math.abs(activeTranslateY) * stretchFactor - Math.abs(activeTranslateX) * 0.004);
				}
			}
		}
	}

	function handlePointerDown(e: PointerEvent) {
		if (disabled) return;
		if (e.pointerType === "mouse" && e.button !== 0) return;
		if (inButtonGroup) return;

		const target = e.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		buttonRect = rect;

		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const size = Math.max(rect.width, rect.height) * 2.5;

		const id = nextRippleId++;
		const newRipple = { id, x, y, size, isReleased: false };
		ripples.push(newRipple);
		currentActiveRippleId = id;

		if (isScale) {
			buttonScaleX = 1.05;
			buttonScaleY = 1.05;
		}

		if (isMagnetic || isScale) {
			const rx = rect.width / 2;
			const ry = rect.height / 2;
			const offX = x - rx;
			const offY = y - ry;
			const distance = Math.sqrt(offX * offX + offY * offY);

			if (distance > 0) {
				if (isMagnetic) {
					const pullX = (offX / distance) * Math.min(distance * 0.16, 20);
					const pullY = (offY / distance) * Math.min(distance * 0.16, 20);
					buttonTranslateX = pullX;
					buttonTranslateY = pullY;
				}

				if (isScale) {
					const stretchFactor = 0.008;
					const activeTranslateX = isMagnetic ? buttonTranslateX : offX;
					const activeTranslateY = isMagnetic ? buttonTranslateY : offY;
					buttonScaleX = Math.max(0.95, 1.05 + Math.abs(activeTranslateX) * stretchFactor - Math.abs(activeTranslateY) * 0.004);
					buttonScaleY = Math.max(0.95, 1.05 + Math.abs(activeTranslateY) * stretchFactor - Math.abs(activeTranslateX) * 0.004);
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
		buttonRect = null;

		buttonTranslateX = 0;
		buttonTranslateY = 0;
		buttonScaleX = 1;
		buttonScaleY = 1;

		if (typeof window !== "undefined") {
			window.removeEventListener("pointermove", handlePointerMoveWindow);
			window.removeEventListener("pointerup", handleRelease);
			window.removeEventListener("pointercancel", handleRelease);
		}
	}

	function handleMouseLeave() {
		if (currentActiveRippleId === null) {
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

	let showSpecular = $derived(inButtonGroup ? false : specular || specularAngle !== undefined);
	let activeAngle = $derived(hoverAngle !== null ? hoverAngle : (specularAngle ?? -45));

	let transformParts = $derived.by(() => {
		if (currentActiveRippleId === null) return [];
		const parts: string[] = [];
		if (isMagnetic) {
			parts.push(`translate3d(${buttonTranslateX}px, ${buttonTranslateY}px, 0)`);
		} else {
			parts.push(`translate3d(0, 0, 0)`);
		}
		if (isScale) {
			parts.push(`scale(${buttonScaleX}, ${buttonScaleY})`);
		} else {
			parts.push(`scale(1)`);
		}
		return parts;
	});

	let transformStyle = $derived(transformParts.length > 0 ? `transform: ${transformParts.join(" ")};` : "");

	let buttonStyle = $derived(`${style ?? ""}; ${showSpecular ? `--specular-angle: ${activeAngle}deg;` : ""} ${transformStyle}`);
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(
			buttonVariants({ variant, size }),
			inButtonGroup ? "bg-transparent! hover:bg-transparent! border-none! shadow-none! backdrop-blur-none! hover:text-foreground/90 dark:hover:text-white font-normal" : showSpecular && "btn-specular",
			className,
		)}
		style={buttonStyle}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		role={disabled ? "link" : undefined}
		tabindex={disabled ? -1 : undefined}
		onpointermove={handlePointerMove}
		onpointerdown={handlePointerDown}
		onmouseleave={handleMouseLeave}
		{...restProps}
	>
		{#if !inButtonGroup}
			<div class="ripple-container">
				{#each ripples as ripple (ripple.id)}
					<div use:triggerTransition class="ripple" class:is-released={ripple.isReleased} style="left: {ripple.x}px; top: {ripple.y}px; width: {ripple.size}px; height: {ripple.size}px;"></div>
				{/each}
			</div>
		{/if}
		<span class="relative z-10 flex items-center justify-center gap-[inherit] w-full h-full">
			<span class="contents">{@render children?.()}</span>
		</span>
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={cn(
			buttonVariants({ variant, size }),
			inButtonGroup ? "bg-transparent! hover:bg-transparent! border-none! shadow-none! backdrop-blur-none! hover:text-foreground/90 dark:hover:text-white font-normal" : showSpecular && "btn-specular",
			className,
		)}
		style={buttonStyle}
		{type}
		{disabled}
		onpointermove={handlePointerMove}
		onpointerdown={handlePointerDown}
		onmouseleave={handleMouseLeave}
		{...restProps}
	>
		{#if !inButtonGroup}
			<div class="ripple-container">
				{#each ripples as ripple (ripple.id)}
					<div use:triggerTransition class="ripple" class:is-released={ripple.isReleased} style="left: {ripple.x}px; top: {ripple.y}px; width: {ripple.size}px; height: {ripple.size}px;"></div>
				{/each}
			</div>
		{/if}
		<span class="relative z-10 flex items-center justify-center gap-[inherit] w-full h-full">
			<span class="contents">{@render children?.()}</span>
		</span>
	</button>
{/if}

<style>
	@property --specular-angle {
		syntax: "<angle>";
		inherits: true;
		initial-value: -45deg;
	}

	:global(.btn-specular) {
		position: relative;
	}
	:global(.btn-specular)::after {
		content: "";
		position: absolute;
		inset: 0;
		border-radius: inherit;
		padding: 0.8px;
		background: linear-gradient(var(--specular-angle, -45deg), rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0.04) 50%, rgba(255, 255, 255, 0.14) 100%);
		-webkit-mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask:
			linear-gradient(#fff 0 0) content-box exclude,
			linear-gradient(#fff 0 0);
		mask-composite: exclude;
		pointer-events: none;
		mix-blend-mode: plus-lighter;
		transition: --specular-angle 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}
	:global(.btn-specular:hover)::after {
		transition: none;
	}

	:global(button[data-slot="button"]),
	:global(a[data-slot="button"]) {
		transition:
			transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
			background-color 0.2s,
			border-color 0.2s;
		-webkit-mask-image: -webkit-radial-gradient(white, black);
		mask-image: radial-gradient(white, black);
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
		background: radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 70%);
		pointer-events: none;
		mix-blend-mode: plus-lighter;
		filter: blur(16px);
		transition:
			transform 1.2s cubic-bezier(0.1, 0.8, 0.2, 1),
			opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1),
			left 0.15s cubic-bezier(0.25, 1, 0.5, 1),
			top 0.15s cubic-bezier(0.25, 1, 0.5, 1);
	}

	.ripple.is-holding {
		transform: translate(-50%, -50%) scale(0.65);
		opacity: 1;
	}

	.ripple.is-holding.is-released {
		transform: translate(-50%, -50%) scale(1.4);
		opacity: 0;
		transition:
			transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
			opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1);
	}
</style>
