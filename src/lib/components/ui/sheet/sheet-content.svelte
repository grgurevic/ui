<script lang="ts" module>
	export type Side = "top" | "right" | "bottom" | "left";
</script>

<script lang="ts">
	import { Dialog as SheetPrimitive } from "bits-ui";
	import type { Snippet } from "svelte";
	import SheetPortal from "./sheet-portal.svelte";
	import SheetOverlay from "./sheet-overlay.svelte";
	import { Button } from "$lib/components/ui/button/index.js";
	import XIcon from "@lucide/svelte/icons/x";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		side = "right",
		showCloseButton = true,
		portalProps,
		children,
		style,
		liquidGlass = false,
		refractiveIndex = 1.5,
		bezelWidth = 30,
		displacementScale = 40,
		surfaceProfile = "squircle",
		chromaticAberration = false,
		saturationBoost = 1.3,
		backgroundBlur = 0.3,
		...restProps
	}: WithoutChildrenOrChild<SheetPrimitive.ContentProps> & {
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof SheetPortal>>;
		side?: Side;
		showCloseButton?: boolean;
		children: Snippet;
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
</script>

<SheetPortal {...portalProps}>
	<SheetOverlay />
	<SheetPrimitive.Content
		bind:ref
		data-slot="sheet-content"
		data-side={side}
		class={cn(
			"bg-popover text-popover-foreground relative fixed z-50 flex flex-col gap-4 bg-clip-padding text-sm shadow-lg transition duration-300 ease-in-out data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full md:data-[side=left]:h-[calc(100vh-2rem)] data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full md:data-[side=right]:h-[calc(100vh-2rem)] data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm data-open:animate-in data-[side=bottom]:data-open:slide-in-from-bottom-full data-[side=left]:data-open:slide-in-from-left-full data-[side=right]:data-open:slide-in-from-right-full data-[side=top]:data-open:slide-in-from-top-full data-closed:animate-out data-[side=bottom]:data-closed:slide-out-to-bottom-full data-[side=left]:data-closed:slide-out-to-left-full data-[side=right]:data-closed:slide-out-to-right-full data-[side=top]:data-closed:slide-out-to-top-full md:m-4 rounded-3xl p-6",
			liquidGlass && "liquid-glass-active",
			className,
		)}
		style={`${style ?? ""}; ${lgState.backdropStyle}`}
		{...restProps}
	>
		{@render children?.()}
		{#if showCloseButton}
			<SheetPrimitive.Close data-slot="sheet-close" class="absolute top-6 right-6">
				{#snippet child({ props })}
					<Button variant="ghost" size="icon-sm" specular={false} magnetic={false} scale={false} {...props}>
						<XIcon />
					</Button>
				{/snippet}
			</SheetPrimitive.Close>
		{/if}
	</SheetPrimitive.Content>
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
</SheetPortal>
