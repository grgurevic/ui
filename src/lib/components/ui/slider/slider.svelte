<script lang="ts">
	import { Slider as SliderPrimitive } from "bits-ui";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import { gsap } from "gsap";

	let {
		ref = $bindable(null),
		value = $bindable(),
		orientation = "horizontal",
		class: className,
		min = 0,
		max = 100,
		...restProps
	}: WithoutChildrenOrChild<SliderPrimitive.RootProps> & {
		min?: number;
		max?: number;
	} = $props();

	let rootEl = $state<HTMLElement | null>(null);
	let isDragging = $state<boolean>(false);
	let thumbElements = $state<HTMLElement[]>([]);

	function handlePointerDown(e: PointerEvent) {
		isDragging = true;
	}

	// Capture pointerup and pointercancel globally to reset active drag states
	$effect(() => {
		const onDocPointerUp = () => {
			isDragging = false;
		};
		document.addEventListener("pointerup", onDocPointerUp, { capture: true });
		document.addEventListener("pointercancel", onDocPointerUp, { capture: true });

		return () => {
			document.removeEventListener("pointerup", onDocPointerUp, { capture: true });
			document.removeEventListener("pointercancel", onDocPointerUp, { capture: true });
		};
	});

	// Store previous value to measure real-time slide velocities
	let prevValue = (Array.isArray(value) ? value[0] : value) ?? 0;

	$effect(() => {
		if (!isDragging) return;

		let lastTime = performance.now();
		let rafId: number;

		const tick = () => {
			const now = performance.now();
			const dt = Math.max(1, now - lastTime);
			lastTime = now;

			const currentVal = (Array.isArray(value) ? value[0] : value) ?? min;
			const diff = currentVal - prevValue;
			prevValue = currentVal;

			if (!thumbElements || thumbElements.length === 0) {
				rafId = requestAnimationFrame(tick);
				return;
			}

			const isAtMin = currentVal <= min;
			const isAtMax = currentVal >= max;

			if (isAtMin || isAtMax) {
				const origin = orientation === "horizontal" ? (isAtMin ? "right center" : "left center") : isAtMin ? "top center" : "bottom center";

				gsap.to(thumbElements, {
					scaleX: orientation === "horizontal" ? 1.6 : 0.75,
					scaleY: orientation === "horizontal" ? 0.75 : 1.6,
					transformOrigin: origin,
					duration: 0.22,
					ease: "power2.out",
					overwrite: "auto",
				});
			} else if (Math.abs(diff) > 0.01) {
				const normalizedDiff = diff / (max - min);
				const stretch = Math.min(Math.abs(normalizedDiff) * 6.5, 1); // highly sensitive scale

				const targetScaleX = orientation === "horizontal" ? 1.25 + stretch * 1.5 : 1.25 - stretch * 1.15;
				const targetScaleY = orientation === "horizontal" ? 1.25 - stretch * 1.15 : 1.25 + stretch * 1.5;

				gsap.to(thumbElements, {
					scaleX: targetScaleX,
					scaleY: targetScaleY,
					transformOrigin: "center center",
					duration: 0.15,
					ease: "power2.out",
					overwrite: "auto",
				});
			} else {
				// Sudden stop while holding: spring and wobble elastically back to normal active scale (1.25)
				// Starts from opposite X/Y offsets, inducing out-of-phase jelly wiggle
				gsap.to(thumbElements, {
					scaleX: 1.25,
					scaleY: 1.25,
					transformOrigin: "center center",
					duration: 0.85,
					ease: "elastic.out(1.6, 0.38)", // beautiful physical wiggle
					overwrite: "auto",
				});
			}

			rafId = requestAnimationFrame(tick);
		};

		rafId = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafId);
	});

	// Trigger smooth GSAP elastic release when dragging stops
	$effect(() => {
		if (!isDragging) {
			if (thumbElements && thumbElements.length > 0) {
				gsap.to(thumbElements, {
					scaleX: 1,
					scaleY: 1,
					transformOrigin: "center center",
					duration: 0.95,
					ease: "elastic.out(1.2, 0.48)", // Viscous spring-back landing physics
					overwrite: "auto",
				});
			}
		}
	});
</script>

<!--
Discriminated Unions + Destructuring (required for bindable) do not
get along, so we bypass type checking by casting `value` to `never`.
-->
<SliderPrimitive.Root
	bind:ref
	bind:value={value as never}
	data-slot="slider"
	{orientation}
	{min}
	{max}
	class={cn("data-vertical:min-h-40 relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:w-auto data-vertical:flex-col", className)}
	{...restProps}
>
	{#snippet children({ thumbItems })}
		<span
			bind:this={rootEl}
			data-slot="slider-track"
			data-orientation={orientation}
			class={cn("bg-muted rounded-full data-horizontal:h-1.5 data-horizontal:w-full data-vertical:h-full data-vertical:w-1.5 bg-muted relative grow overflow-hidden pointer-events-none")}
		>
			<SliderPrimitive.Range data-slot="slider-range" class={cn("bg-primary absolute select-none data-horizontal:h-full data-vertical:w-full pointer-events-none")} />
		</span>
		{#each thumbItems as thumb (thumb.index)}
			<SliderPrimitive.Thumb
				data-slot="slider-thumb"
				index={thumb.index}
				class="block shrink-0 select-none disabled:pointer-events-none disabled:opacity-50 pointer-events-auto h-5 w-8 rounded-full focus-visible:outline-hidden group/slider-thumb"
			>
				<div
					role="presentation"
					bind:this={thumbElements[thumb.index]}
					onpointerdown={handlePointerDown}
					class={cn(
						"border block w-full h-full select-none transition-[background-color,border-color,backdrop-filter] duration-200 rounded-full shadow-sm",
						isDragging ? "dark:bg-primary-foreground/15 border-primary-foreground/15 backdrop-blur-[2px] shadow-none" : "bg-white dark:bg-primary-foreground/90 border-border",
					)}
				></div>
			</SliderPrimitive.Thumb>
		{/each}
	{/snippet}
</SliderPrimitive.Root>
