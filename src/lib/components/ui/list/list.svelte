<script lang="ts">
	import { cn } from "$lib/utils.js";

	let {
		class: className,
		children,
		...restProps
	}: {
		class?: string;
		children?: any;
		[key: string]: any;
	} = $props();
</script>

<div class={cn("bg-card text-card-foreground rounded-3xl overflow-hidden flex flex-col w-full relative list", className)} {...restProps}>
	{@render children?.()}
</div>

<style>
	.list {
		--corner-shape: bevel;
	}
</style>
