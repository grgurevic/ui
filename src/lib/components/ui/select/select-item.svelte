<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import { cn, type WithoutChild } from "$lib/utils.js";
	import CheckIcon from "@lucide/svelte/icons/check";
	import { getContext, onDestroy } from "svelte";

	let { ref = $bindable(null), class: className, value, label, children: childrenProp, ...restProps }: WithoutChild<SelectPrimitive.ItemProps> = $props();

	const interaction = getContext<{ isKeyboardActive: boolean }>("select-interaction");
	let isHovered = $state(false);

	let ripples = $state<{ id: number; x: number; y: number; size: number; isReleased: boolean }[]>([]);
	let nextRippleId = 0;
	let currentActiveRippleId = $state<number | null>(null);

	function handlePointerDown(e: PointerEvent) {
		if (e.pointerType === "mouse" && e.button !== 0) return;
		const target = e.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const size = Math.max(rect.width, rect.height) * 2.5;

		const id = nextRippleId++;
		const newRipple = { id, x, y, size, isReleased: false };
		ripples.push(newRipple);
		currentActiveRippleId = id;

		if (typeof window !== "undefined") {
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
		if (typeof window !== "undefined") {
			window.removeEventListener("pointerup", handleRelease);
			window.removeEventListener("pointercancel", handleRelease);
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
			window.removeEventListener("pointerup", handleRelease);
			window.removeEventListener("pointercancel", handleRelease);
		}
	});
</script>

<SelectPrimitive.Item
	bind:ref
	{value}
	data-slot="select-item"
	class={cn(
		"text-foreground gap-2 rounded-full py-2 pr-3 pl-9 text-base [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 relative flex w-full cursor-default items-center outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 overflow-hidden transition-colors duration-150",
		className,
	)}
	onpointerdown={handlePointerDown}
	onpointerenter={(e) => {
		isHovered = true;
		if (typeof restProps.onpointerenter === "function") {
			restProps.onpointerenter(e);
		}
	}}
	onpointerleave={(e) => {
		isHovered = false;
		if (typeof restProps.onpointerleave === "function") {
			restProps.onpointerleave(e);
		}
	}}
	onpointermove={(e) => {
		isHovered = true;
		if (typeof restProps.onpointermove === "function") {
			restProps.onpointermove(e);
		}
	}}
	{...restProps}
>
	{#snippet children({ selected, highlighted })}
		<div class="ripple-container">
			{#each ripples as ripple (ripple.id)}
				<div use:triggerTransition class="ripple" class:is-released={ripple.isReleased} style="left: {ripple.x}px; top: {ripple.y}px; width: {ripple.size}px; height: {ripple.size}px;"></div>
			{/each}
		</div>

		<!-- Dynamic Specular Hover Pill Background -->
		{@const isReallyHighlighted = highlighted && (isHovered || (interaction?.isKeyboardActive ?? false))}
		<div class={cn("absolute inset-0 rounded-full transition-colors duration-150 z-0", isReallyHighlighted ? "bg-white/10" : "bg-transparent")}></div>

		<span class="absolute start-3.5 flex size-4 items-center justify-center z-20 text-foreground">
			{#if selected}
				<CheckIcon class="size-4 stroke-[2.5px]" />
			{/if}
		</span>
		<span class="relative z-10 text-foreground">
			{#if childrenProp}
				{@render childrenProp({ selected, highlighted: isReallyHighlighted })}
			{:else}
				{label || value}
			{/if}
		</span>
	{/snippet}
</SelectPrimitive.Item>

<style>
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
		background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%);
		pointer-events: none;
		mix-blend-mode: plus-lighter;
		filter: blur(16px);
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
</style>
