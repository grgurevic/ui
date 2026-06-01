<script lang="ts">
	import { getContext, onMount, onDestroy } from "svelte";
	import { CONTEXT_KEY, type NavigationStackState } from "./context.svelte.js";
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { children, class: className, ...restProps }: HTMLAttributes<HTMLHeadingElement> = $props();

	const navState = getContext(CONTEXT_KEY) as NavigationStackState | undefined;
	let el = $state<HTMLElement | null>(null);

	onMount(() => {
		if (navState && el) {
			navState.registerLargeTitle(el);
		}
	});

	onDestroy(() => {
		if (navState) {
			navState.unregisterLargeTitle();
		}
	});
</script>

<h1 bind:this={el} data-large-title class={cn("text-4xl font-bold text-foreground", className)} {...restProps}>
	{@render children?.()}
</h1>
