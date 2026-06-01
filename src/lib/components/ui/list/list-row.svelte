<script lang="ts">
	import { cn } from "$lib/utils.js";

	let {
		class: className,
		onclick,
		href,
		style,
		children,
		...restProps
	}: {
		class?: string;
		onclick?: (e: MouseEvent) => void;
		href?: string;
		style?: string;
		children?: any;
		[key: string]: any;
	} = $props();

	let rowStyle = $derived(style ?? "");
</script>

{#if href}
	<a
		{href}
		class={cn(
			"list-row w-full flex items-center justify-between p-4 text-left transition-all duration-100 outline-none select-none relative bg-card text-card-foreground",
			"hover:bg-muted/30 active:bg-muted/60 cursor-pointer",
			className,
		)}
		style={rowStyle}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else if onclick}
	<button
		type="button"
		{onclick}
		class={cn(
			"list-row w-full flex items-center justify-between p-4 text-left transition-all duration-100 outline-none select-none relative bg-card text-card-foreground",
			"hover:bg-muted/30 active:bg-muted/60 cursor-pointer",
			className,
		)}
		style={rowStyle}
		{...restProps}
	>
		{@render children?.()}
	</button>
{:else}
	<div class={cn("list-row w-full flex items-center justify-between p-4 text-left select-none relative bg-card text-card-foreground", className)} style={rowStyle} {...restProps}>
		{@render children?.()}
	</div>
{/if}

<style>
	/* Custom left-inset divider line matching genuine iOS Settings */
	:global(.list-row:not(:last-child))::after {
		content: "";
		position: absolute;
		bottom: 0;
		right: 1rem;
		left: 1rem;
		height: 1px;
		background-color: var(--border);
		opacity: 0.5;
	}
</style>
