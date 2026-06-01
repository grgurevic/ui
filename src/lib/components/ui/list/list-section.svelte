<script lang="ts">
	import { cn } from "$lib/utils.js";

	let {
		class: className,
		header,
		footer,
		children,
		...restProps
	}: {
		class?: string;
		header?: string | any;
		footer?: string | any;
		children?: any;
		[key: string]: any;
	} = $props();
</script>

<div class={cn("flex flex-col gap-1.5 w-full", className)} {...restProps}>
	{#if header}
		<span class="text-[13px] font-semibold text-muted-foreground px-4 select-none">
			{#if typeof header === "string"}
				{header}
			{:else}
				{@render header()}
			{/if}
		</span>
	{/if}

	<div class="flex flex-col w-full">
		{@render children?.()}
	</div>

	{#if footer}
		<p class="text-xs text-muted-foreground/70 px-4 leading-normal select-none">
			{#if typeof footer === "string"}
				{footer}
			{:else}
				{@render footer()}
			{/if}
		</p>
	{/if}
</div>
