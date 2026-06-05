<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import SelectPortal from "./select-portal.svelte";
	import SelectScrollUpButton from "./select-scroll-up-button.svelte";
	import SelectScrollDownButton from "./select-scroll-down-button.svelte";
	import { cn, type WithoutChild } from "$lib/utils.js";
	import { setContext, type ComponentProps } from "svelte";
	import type { WithoutChildrenOrChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 4,
		portalProps,
		children,
		preventScroll = true,
		style,
		liquidGlass = false,
		refractiveIndex = 1.5,
		bezelWidth = 30,
		displacementScale = 30,
		surfaceProfile = "squircle",
		chromaticAberration = false,
		saturationBoost = 1.3,
		backgroundBlur = 0.3,
		...restProps
	}: WithoutChild<SelectPrimitive.ContentProps> & {
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof SelectPortal>>;
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

	let interactionState = $state({ isKeyboardActive: false });
	setContext("select-interaction", interactionState);

	let hoverAngle = $state<number | null>(null);

	function handleMouseMove(e: MouseEvent) {
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

	function handleMouseLeave() {
		hoverAngle = null;
	}

	let activeAngle = $derived(hoverAngle !== null ? hoverAngle : -45);
</script>

<SelectPortal {...portalProps}>
	<SelectPrimitive.Content
		bind:ref
		{sideOffset}
		{preventScroll}
		data-slot="select-content"
		class={cn(
			"dark:bg-input/80 text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 min-w-36 rounded-3xl shadow-md ring-1 duration-100 data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 relative isolate z-50 overflow-x-hidden overflow-y-auto backdrop-blur-2xl p-1.5",
			className,
		)}
		style="--specular-angle: {activeAngle}deg; {style ?? ''}; {lgState.backdropStyle}"
		onmousemove={(e) => {
			handleMouseMove(e);
			interactionState.isKeyboardActive = false;
		}}
		onmouseleave={handleMouseLeave}
		onkeydown={(e) => {
			interactionState.isKeyboardActive = true;
			if (typeof restProps.onkeydown === "function") {
				restProps.onkeydown(e);
			}
		}}
		{...restProps}
	>
		<SelectScrollUpButton />
		<SelectPrimitive.Viewport class={cn("h-(--bits-select-anchor-height) w-full min-w-(--bits-select-anchor-width) scroll-my-1 relative z-10")}>
			{@render children?.()}
		</SelectPrimitive.Viewport>
		<SelectScrollDownButton />
		<div class="select-content-specular pointer-events-none absolute inset-0 rounded-3xl z-20"></div>
	</SelectPrimitive.Content>
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
</SelectPortal>

<style>
	@property --specular-angle {
		syntax: "<angle>";
		inherits: true;
		initial-value: -45deg;
	}

	.select-content-specular {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		padding: 0.8px;
		background: linear-gradient(var(--specular-angle, -45deg), rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 15%, rgba(255, 255, 255, 0) 85%, rgba(255, 255, 255, 0.12) 94%);
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

	:global(div[data-slot="select-content"]:hover) .select-content-specular {
		transition: none;
	}
</style>
