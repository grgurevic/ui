<script>
	import { ChevronLeft, ChevronRight } from "@lucide/svelte";
	import { linkIndex } from "$lib";
	import { page } from "$app/state";

	let currentIndex = $derived(linkIndex.findIndex((link) => link.url === page.url.pathname));
	let prevLink = $derived(currentIndex > 0 ? linkIndex[currentIndex - 1] : null);
	let nextLink = $derived(currentIndex !== -1 && currentIndex < linkIndex.length - 1 ? linkIndex[currentIndex + 1] : null);
</script>

<div class="flex flex-row items-center justify-between p-6 border-t">
	{#if prevLink}
		<a href={prevLink.url} class="flex flex-row group cursor-pointer items-end gap-2">
			<ChevronLeft class="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
			<div class="flex flex-col">
				<span class="text-muted-foreground text-sm group-hover:text-foreground transition-colors">Previous</span>
				<span class="flex items-center gap-2 leading-4.5">{prevLink.name}</span>
			</div>
		</a>
	{:else}
		<div></div>
	{/if}
	<div class="flex flex-row items-center gap-4 bg-card border py-4 px-6 rounded-full">
		<span>Give feedback</span>
		<div class="*:cursor-pointer *:p-1 *:rounded-full *:hover:bg-secondary flex gap-4">
			<button title="Dislike">👎</button>
			<button title="Like">👍</button>
		</div>
	</div>
	{#if nextLink}
		<a href={nextLink.url} class="flex flex-row group cursor-pointer items-end gap-2">
			<div class="flex flex-col">
				<span class="text-muted-foreground text-sm group-hover:text-foreground transition-colors">Next</span>
				<span class="flex items-center gap-2 leading-4.5">{nextLink.name}</span>
			</div>
			<ChevronRight class="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
		</a>
	{:else}
		<div></div>
	{/if}
</div>
