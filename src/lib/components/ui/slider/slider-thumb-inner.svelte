<script lang="ts">
	import { createLiquidGlass, LiquidGlassFilter } from "$lib/components/ui/glass-view/index.js";
	import { cn } from "$lib/utils.js";

	let {
		isDragging,
		thumbElement = $bindable(),
		onpointerdown,
		liquidGlass = false,
		refractiveIndex = 1.5,
		bezelWidth = 8,
		displacementScale = 6,
		surfaceProfile = "squircle",
		chromaticAberration = false,
		saturationBoost = 1.3,
		backgroundBlur = 0.3,
	}: {
		isDragging: boolean;
		thumbElement?: HTMLElement | null;
		onpointerdown?: (e: PointerEvent) => void;
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
		backgroundBlur
	}));

	let innerElement = $state<HTMLElement | null>(null);

	$effect(() => {
		lgState.ref = innerElement;
	});
</script>

<div
	role="presentation"
	bind:this={thumbElement}
	{onpointerdown}
	class="w-full h-full block"
>
	<div
		bind:this={innerElement}
		class={cn(
			"border block w-full h-full select-none transition-[background-color,border-color,backdrop-filter] duration-200 rounded-full shadow-sm",
			liquidGlass
				? (isDragging
					? "bg-white/25 dark:bg-white/15 border border-white/30 dark:border-white/25 shadow-none"
					: "bg-white/90 dark:bg-primary-foreground/90 border border-white/20 dark:border-white/10 shadow-sm")
				: (isDragging
					? "bg-white/50 dark:bg-primary-foreground/15 border-primary-foreground/15 backdrop-blur-[2px] shadow-none"
					: "bg-white dark:bg-primary-foreground/90 border-border")
		)}
		style={lgState.backdropStyle}
	></div>
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
