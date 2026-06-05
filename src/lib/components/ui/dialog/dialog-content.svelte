<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import DialogPortal from "./dialog-portal.svelte";
	import type { Snippet } from "svelte";
	import * as Dialog from "./index.js";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";
	import { Button } from "$lib/components/ui/button/index.js";
	import XIcon from "@lucide/svelte/icons/x";

	let {
		ref = $bindable(null),
		class: className,
		portalProps,
		children,
		showCloseButton = true,
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
	}: WithoutChildrenOrChild<DialogPrimitive.ContentProps> & {
		portalProps?: WithoutChildrenOrChild<ComponentProps<typeof DialogPortal>>;
		children: Snippet;
		showCloseButton?: boolean;
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

<DialogPortal {...portalProps}>
	<Dialog.Overlay />
	<DialogPrimitive.Content
		bind:ref
		data-slot="dialog-content"
		class={cn(
			"bg-background/80 backdrop-blur-lg text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 ring-foreground/10 grid max-w-[calc(100%-2rem)] gap-6 rounded-4xl p-6 text-sm ring-1 duration-100 sm:max-w-md fixed top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 outline-none dialog-specular",
			liquidGlass && "liquid-glass-active",
			className,
		)}
		style={`${style ?? ""}; ${lgState.backdropStyle}`}
		{...restProps}
	>
		{@render children?.()}
		{#if showCloseButton}
			<DialogPrimitive.Close data-slot="dialog-close">
				{#snippet child({ props })}
					<Button variant="ghost" size="icon" specular={false} {...props} class="absolute top-4 right-4">
						<XIcon />
						<span class="sr-only">Close</span>
					</Button>
				{/snippet}
			</DialogPrimitive.Close>
		{/if}
	</DialogPrimitive.Content>
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
</DialogPortal>

<style>
	:global(.dialog-specular)::after {
		content: "";
		position: absolute;
		inset: -1px;
		border-radius: inherit;
		padding: 1px;
		background: linear-gradient(-45deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 15%, rgba(255, 255, 255, 0) 85%, rgba(255, 255, 255, 0.04) 100%);
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
	}
</style>
