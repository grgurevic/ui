<script lang="ts">
	import { cn } from "$lib/utils.js";

	let {
		class: className,
		bg = "bg-primary",
		children,
		...restProps
	}: {
		class?: string;
		bg?: string;
		children?: any;
		[key: string]: any;
	} = $props();
</script>

<div
	class={cn(
		"size-7 flex items-center justify-center rounded-[7px] text-white shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.1)]",
		bg.startsWith("bg-") ? bg : "",
		className
	)}
	style={!bg.startsWith("bg-") ? `background-color: ${bg};` : undefined}
	{...restProps}
>
	{@render children?.()}
</div>
