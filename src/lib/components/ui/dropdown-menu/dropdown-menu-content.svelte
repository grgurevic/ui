<script lang="ts">
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import DropdownMenuPortal from "./dropdown-menu-portal.svelte";
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import { setContext, type ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		sideOffset = 4,
		align = "start",
		portalProps,
		class: className,
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
	}: DropdownMenuPrimitive.ContentProps & {
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof DropdownMenuPortal>>;
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

	let openSubCount = $state(0);
	setContext("dropdown-menu-content-state", {
		registerSubOpen(isOpen: boolean) {
			if (isOpen) {
				openSubCount++;
			} else {
				openSubCount = Math.max(0, openSubCount - 1);
			}
		},
		get isSubOpen() {
			return openSubCount > 0;
		},
	});

	let isSubOpen = $derived(openSubCount > 0);
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

<DropdownMenuPortal {...portalProps}>
	<DropdownMenuPrimitive.Content
		bind:ref
		data-slot="dropdown-menu-content"
		{sideOffset}
		{align}
		class={cn(
			"data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-background/90 dark:bg-input/80 text-popover-foreground min-w-32 rounded-3xl p-1.5 shadow-xl ring-1 duration-200 transition-all z-50 w-(--bits-dropdown-menu-anchor-width) overflow-x-hidden overflow-y-auto outline-none backdrop-blur-2xl relative isolate",
			isSubOpen && "opacity-80 blur-[1.6px] scale-[0.97] pointer-events-none",
			className,
		)}
		style="--specular-angle: {activeAngle}deg; {style ?? ''}; {lgState.backdropStyle}"
		onmousemove={handleMouseMove}
		onmouseleave={handleMouseLeave}
		{...restProps}
	>
		{@render restProps.children?.()}
		<div class="dropdown-content-specular pointer-events-none absolute inset-0 rounded-3xl z-20"></div>
	</DropdownMenuPrimitive.Content>
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
</DropdownMenuPortal>

<style>
	@property --specular-angle {
		syntax: "<angle>";
		inherits: true;
		initial-value: -45deg;
	}

	.dropdown-content-specular {
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

	:global(div[data-slot="dropdown-menu-content"]:hover) .dropdown-content-specular {
		transition: none;
	}
</style>
