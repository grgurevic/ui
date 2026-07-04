<script lang="ts">
	import { ChevronRight } from "@lucide/svelte";
	import Codeblock from "./codeblock.svelte";
	import { cn } from "$lib/utils";
	import { Switch } from "./ui/switch";

	let { children, code } = $props();

	let open = $state(false);
	let background = $state(false);
</script>

<div class="flex flex-col rounded-md overflow-hidden border divide-y">
	{#if background}
		<div class="bg-card p-4 flex flex-col gap-4 overflow-x-auto bg-[url('https://images.unsplash.com/photo-1593955808003-93f6151e6028')]">
			{@render children()}
		</div>
	{:else}
		<div class="bg-card p-4 flex flex-col gap-4 overflow-x-auto">
			{@render children()}
		</div>
	{/if}
	<div class="flex flex-row justify-between items-center p-4">
		<button onclick={() => (open = !open)} class="flex flex-row items-center gap-3 text-muted-foreground"
			><ChevronRight class={cn("size-4", open ? "rotate-90" : "")} />{open ? "Hide" : "Show"} code</button
		>
		<div class="flex flex-row items-center gap-3 text-muted-foreground">
			<label for="background">Background</label>
			<Switch id="background" bind:checked={background} liquidGlass />
		</div>
	</div>
	{#if open}
		<div class="w-full overflow-x-auto">
			<Codeblock {code} lang="svelte" />
		</div>
	{/if}
</div>
