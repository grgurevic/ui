<script lang="ts">
	import { goto } from "$app/navigation";
	import { linkIndex } from "$lib";
	import * as Command from "$lib/components/ui/command";
	import { Search } from "@lucide/svelte";

	let { open = $bindable(false) }: { open?: boolean } = $props();

	const groups = [
		{
			title: "Foundations",
			items: linkIndex.filter((l) => l.parent === "Foundations"),
		},
		{
			title: "Components",
			items: linkIndex.filter((l) => l.parent === "Components"),
		},
	];

	function handleSelect(url: string) {
		open = false;
		goto(url);
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if ((e.metaKey || e.ctrlKey) && e.key === "k") {
			e.preventDefault();
			open = !open;
		}
	}}
/>

<Command.CommandDialog bind:open title="Search" description="Search for a page">
	{#snippet children()}
		<Command.CommandInput placeholder="Search..." />
		<Command.CommandList>
			<Command.CommandEmpty>No results found.</Command.CommandEmpty>
			{#each groups as group}
				{#if group.items.length > 0}
					<Command.CommandGroup heading={group.title}>
						{#each group.items as item}
							<Command.CommandItem
								value={item.name}
								onSelect={() => handleSelect(item.url)}
							>
								{item.name}
							</Command.CommandItem>
						{/each}
					</Command.CommandGroup>
				{/if}
			{/each}
		</Command.CommandList>
	{/snippet}
</Command.CommandDialog>
