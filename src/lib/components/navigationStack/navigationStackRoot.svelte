<script lang="ts">
	import { setContext } from "svelte";
	import { NavigationStackState, CONTEXT_KEY } from "./context.svelte.js";

	let { children } = $props();

	const state = new NavigationStackState();
	setContext(CONTEXT_KEY, state);
</script>

<div class="relative w-full min-h-screen flex flex-col items-stretch">
	{@render children?.()}
</div>
