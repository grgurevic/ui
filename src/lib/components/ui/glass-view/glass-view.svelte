<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { type VariantProps, tv } from "tailwind-variants";
	import { buttonVariants } from "$lib/components/ui/button/button.svelte";

	export type GlassVariant = VariantProps<typeof buttonVariants>["variant"];
	export type GlassSize = VariantProps<typeof buttonVariants>["size"];
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { onDestroy } from "svelte";
	import { generateDisplacementMap } from "./generate-displacement-map.js";
	import LiquidGlassFilter from "./liquid-glass-filter.svelte";

	let {
		ref = $bindable(null),
		class: className,
		variant = "prominent",
		size = "default",
		specular = true,
		specularAngle = undefined,
		scale = true,
		magnetic = true,
		style,
		liquidGlass = true,
		refractiveIndex = 1.5,
		bezelWidth = 24,
		displacementScale = 40,
		surfaceProfile = "squircle",
		chromaticAberration = true,
		saturationBoost = 1.3,
		backgroundBlur = 0.3,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		variant?: GlassVariant;
		size?: GlassSize;
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
	} = $props();

	let hoverAngle = $state<number | null>(null);
	let ripples = $state<{ id: number; x: number; y: number; size: number; isReleased: boolean }[]>([]);
	let nextRippleId = 0;
	let currentActiveRippleId = $state<number | null>(null);

	let translateX = $state(0);
	let translateY = $state(0);
	let scaleX = $state(1);
	let scaleY = $state(1);
	let elRect = $state<DOMRect | null>(null);

	import { createLiquidGlass } from "./liquid-glass.svelte.js";

	const lgState = createLiquidGlass(() => ({
		liquidGlass,
		refractiveIndex,
		bezelWidth,
		displacementScale,
		surfaceProfile,
		chromaticAberration,
		saturationBoost,
		backgroundBlur,
	}));

	$effect(() => {
		lgState.ref = ref;
	});

	function handlePointerMove(e: PointerEvent) {
		if (currentActiveRippleId !== null) return;
		const target = e.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const dx = e.clientX - (rect.left + rect.width / 2);
		const dy = e.clientY - (rect.top + rect.height / 2);
		hoverAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 270;
	}

	function handlePointerMoveWindow(e: PointerEvent) {
		if (currentActiveRippleId === null || !elRect) return;

		const x = e.clientX - elRect.left;
		const y = e.clientY - elRect.top;

		ripples = ripples.map((r) => (r.id === currentActiveRippleId ? { ...r, x, y } : r));

		const dx = e.clientX - (elRect.left + elRect.width / 2);
		const dy = e.clientY - (elRect.top + elRect.height / 2);
		hoverAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 270;

		if (magnetic || scale) {
			const offX = e.clientX - elRect.left - elRect.width / 2;
			const offY = e.clientY - elRect.top - elRect.height / 2;
			const distance = Math.sqrt(offX * offX + offY * offY);

			if (distance > 0) {
				if (magnetic) {
					const maxPull = 26;
					const pullStrength = 0.14;
					translateX = (offX / distance) * Math.min(distance * pullStrength, maxPull);
					translateY = (offY / distance) * Math.min(distance * pullStrength, maxPull);
				}
				if (scale) {
					const activeX = magnetic ? translateX : offX;
					const activeY = magnetic ? translateY : offY;
					scaleX = Math.max(0.95, 1.05 + Math.abs(activeX) * 0.008 - Math.abs(activeY) * 0.004);
					scaleY = Math.max(0.95, 1.05 + Math.abs(activeY) * 0.008 - Math.abs(activeX) * 0.004);
				}
			}
		}
	}

	function handlePointerDown(e: PointerEvent) {
		if (e.pointerType === "mouse" && e.button !== 0) return;

		const target = e.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		elRect = rect;

		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const rippleSize = Math.max(rect.width, rect.height) * 2.5;
		const id = nextRippleId++;
		ripples.push({ id, x, y, size: rippleSize, isReleased: false });
		currentActiveRippleId = id;

		if (scale) {
			scaleX = 1.05;
			scaleY = 1.05;
		}

		if (magnetic || scale) {
			const offX = x - rect.width / 2;
			const offY = y - rect.height / 2;
			const distance = Math.sqrt(offX * offX + offY * offY);
			if (distance > 0) {
				if (magnetic) {
					translateX = (offX / distance) * Math.min(distance * 0.16, 20);
					translateY = (offY / distance) * Math.min(distance * 0.16, 20);
				}
				if (scale) {
					const activeX = magnetic ? translateX : offX;
					const activeY = magnetic ? translateY : offY;
					scaleX = Math.max(0.95, 1.05 + Math.abs(activeX) * 0.008 - Math.abs(activeY) * 0.004);
					scaleY = Math.max(0.95, 1.05 + Math.abs(activeY) * 0.008 - Math.abs(activeX) * 0.004);
				}
			}
		}

		window.addEventListener("pointermove", handlePointerMoveWindow);
		window.addEventListener("pointerup", handleRelease);
		window.addEventListener("pointercancel", handleRelease);
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
		elRect = null;
		translateX = 0;
		translateY = 0;
		scaleX = 1;
		scaleY = 1;
		window.removeEventListener("pointermove", handlePointerMoveWindow);
		window.removeEventListener("pointerup", handleRelease);
		window.removeEventListener("pointercancel", handleRelease);
	}

	function handleMouseLeave() {
		if (currentActiveRippleId === null) hoverAngle = null;
	}

	function triggerTransition(node: HTMLElement) {
		requestAnimationFrame(() => requestAnimationFrame(() => node.classList.add("is-holding")));
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
		if (currentActiveRippleId === null) return [];
		const parts: string[] = [];
		if (magnetic) parts.push(`translate3d(${translateX}px, ${translateY}px, 0)`);
		else parts.push(`translate3d(0,0,0)`);
		if (scale) parts.push(`scale(${scaleX}, ${scaleY})`);
		else parts.push(`scale(1)`);
		return parts;
	});

	let transformStyle = $derived(transformParts.length > 0 ? `transform: ${transformParts.join(" ")};` : "");

	let elStyle = $derived(`${style ?? ""}; ${showSpecular ? `--specular-angle: ${activeAngle}deg;` : ""} ${transformStyle} ${lgState.backdropStyle}`);
</script>

<div
	bind:this={ref}
	data-slot="glass-view"
	data-variant={variant}
	role="presentation"
	class={cn(buttonVariants({ variant, size }), showSpecular && "btn-specular", liquidGlass && "liquid-glass-active", "cursor-default select-none", className)}
	style={elStyle}
	onpointermove={handlePointerMove}
	onpointerdown={handlePointerDown}
	onmouseleave={handleMouseLeave}
	{...restProps}
>
	<div class="ripple-container">
		{#each ripples as r (r.id)}
			<div use:triggerTransition class="ripple" class:is-released={r.isReleased} style="left: {r.x}px; top: {r.y}px; width: {r.size}px; height: {r.size}px;"></div>
		{/each}
	</div>
	<span class="relative z-10 flex items-center justify-center gap-[inherit] w-full h-full">
		<span class="contents">{@render children?.()}</span>
	</span>
</div>

{#if liquidGlass && lgState.isChromium && lgState.displacementMapUri}
	<LiquidGlassFilter
		filterId={lgState.filterId}
		displacementMapUri={lgState.displacementMapUri}
		specularMapUri={lgState.specularMapUri}
		width={lgState.width}
		height={lgState.height}
		{displacementScale}
		{saturationBoost}
		{backgroundBlur}
		{chromaticAberration}
	/>
{/if}

<style>
	@property --specular-angle {
		syntax: "<angle>";
		inherits: true;
		initial-value: -45deg;
	}

	:global(div[data-slot="glass-view"]) {
		transition:
			transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
			background-color 0.2s,
			border-color 0.2s;
		overflow: hidden;
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
