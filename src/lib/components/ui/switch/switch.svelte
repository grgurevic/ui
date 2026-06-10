<script lang="ts">
	import { Switch as SwitchPrimitive } from "bits-ui";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import { onDestroy } from "svelte";
	import { createLiquidGlass, LiquidGlassFilter } from "$lib/components/ui/glass-view/index.js";

	let {
		ref = $bindable(null),
		class: className,
		checked = $bindable(false),
		style,
		liquidGlass = true,
		refractiveIndex = 1.5,
		bezelWidth = 10,
		displacementScale = 6,
		surfaceProfile = "squircle",
		chromaticAberration = false,
		saturationBoost = 1.3,
		backgroundBlur = 0.8,
		...restProps
	}: WithoutChildrenOrChild<SwitchPrimitive.RootProps> & {
		style?: string;
		liquidGlass?: boolean;
		refractiveIndex?: number;
		bezelWidth?: number;
		displacementScale?: number;
		surfaceProfile?: "circle" | "squircle" | "concave" | "lip";
		chromaticAberration?: boolean;
		saturationBoost?: number;
		backgroundBlur?: number;
	} = $props();

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

	let thumbEl = $state<HTMLElement | null>(null);

	$effect(() => {
		lgState.ref = thumbEl;
	});

	let isSwitching = $state<boolean>(false);
	let isHolding = $state<boolean>(false);
	let lastChecked = checked;
	let currentDragTranslate = $state<number | null>(null);
	let thumbScaleX = $state<number>(1);
	let transformOrigin = $state<string>("center");
	let wasDragged = $state<boolean>(false);

	const physics = { pullFactor: 0.3, maxPull: 5, scaleFactor: 0.008, maxScale: 0.06 };

	$effect(() => {
		if (checked !== lastChecked) {
			lastChecked = checked;
			isSwitching = true;
			const timer = setTimeout(() => {
				isSwitching = false;
			}, 225);
			return () => clearTimeout(timer);
		}
	});

	function handleMouseDown(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const startMouseX = e.clientX;
		const startThumbX = checked ? 12 : 1;
		isHolding = true;
		wasDragged = false;

		function handleMouseMoveWindow(e: MouseEvent) {
			const currentMouseX = e.clientX;
			const deltaX = currentMouseX - startMouseX;
			let newThumbX = startThumbX + deltaX;

			let targetTranslate = newThumbX;
			let scaleX = 1;

			if (newThumbX < 1) {
				const offX = newThumbX - 1;
				const pullX = -Math.min(Math.abs(offX) * physics.pullFactor, physics.maxPull);
				targetTranslate = 1 + pullX;
				scaleX = 1 + Math.min(Math.abs(offX - pullX) * physics.scaleFactor, physics.maxScale);
			} else if (newThumbX > 12) {
				const offX = newThumbX - 12;
				const pullX = Math.min(offX * physics.pullFactor, physics.maxPull);
				targetTranslate = 12 + pullX;
				scaleX = 1 + Math.min(Math.abs(offX - pullX) * physics.scaleFactor, physics.maxScale);
			} else {
				targetTranslate = newThumbX;
				scaleX = 1;
			}

			if (deltaX > 0) {
				transformOrigin = "left center";
			} else if (deltaX < 0) {
				transformOrigin = "right center";
			} else {
				transformOrigin = "center";
			}

			currentDragTranslate = targetTranslate;
			thumbScaleX = scaleX;

			if (newThumbX > 6) {
				checked = true;
			} else {
				checked = false;
			}
		}

		function handleMouseUpWindow(e: MouseEvent) {
			isHolding = false;
			currentDragTranslate = null;
			thumbScaleX = 1;
			transformOrigin = "center";

			const totalDelta = Math.abs(e.clientX - startMouseX);
			if (totalDelta > 4) {
				wasDragged = true;
			} else {
				wasDragged = false;
			}

			if (typeof window !== "undefined") {
				window.removeEventListener("mousemove", handleMouseMoveWindow);
				window.removeEventListener("mouseup", handleMouseUpWindow);
			}
		}

		if (typeof window !== "undefined") {
			window.addEventListener("mousemove", handleMouseMoveWindow);
			window.addEventListener("mouseup", handleMouseUpWindow);
		}
	}

	function handleClick(e: MouseEvent) {
		if (wasDragged) {
			e.preventDefault();
			e.stopPropagation();
			wasDragged = false;
		}
	}

	onDestroy(() => {
		if (typeof window !== "undefined") {
			window.removeEventListener("mousemove", () => {});
			window.removeEventListener("mouseup", () => {});
		}
	});
</script>

<SwitchPrimitive.Root
	bind:ref
	bind:checked
	data-slot="switch"
	onmousedown={handleMouseDown}
	onclick={handleClick}
	class={cn(
		"data-checked:bg-primary data-unchecked:bg-black/25 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 dark:data-unchecked:bg-input/80 shrink-0 rounded-full border border-transparent shadow-xs aria-invalid:ring-3 h-[24px] w-[56px] peer group/switch relative inline-flex items-center transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 data-disabled:cursor-not-allowed data-disabled:opacity-50",
		className,
	)}
	{style}
	{...restProps}
>
	<SwitchPrimitive.Thumb
		bind:ref={thumbEl}
		data-slot="switch-thumb"
		class={cn(
			"rounded-full h-5 w-8 pointer-events-none block ring-0 transition-all backdrop-blur-[2px]",
			currentDragTranslate === null && "data-checked:translate-x-[calc(100%-11px)] data-unchecked:translate-x-px rtl:data-[state=checked]:translate-x-[calc(-100%)]",
			liquidGlass
				? (isSwitching || isHolding
					? "bg-white/25 dark:bg-white/15 border border-white/30 dark:border-white/25 shadow-none scale-160 duration-200"
					: "bg-white/90 dark:bg-primary-foreground/90 border border-white/20 dark:border-white/10 shadow-sm")
				: (isSwitching || isHolding
					? "scale-160 dark:bg-primary-foreground/15 border border-primary-foreground/15 duration-200"
					: "bg-white dark:bg-primary-foreground/90")
		)}
		style={`${currentDragTranslate !== null ? `transform: translate3d(${currentDragTranslate}px, 0, 0) scale(${thumbScaleX}, 1); transform-origin: ${transformOrigin}; transition: none;` : ""} ${lgState.backdropStyle}`}
	/>
</SwitchPrimitive.Root>

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
