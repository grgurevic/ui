<script lang="ts">
	import { page } from "$app/state";
	import { cn } from "$lib/utils";
	import { Button } from "./ui/button";
	import { Menu, X } from "@lucide/svelte";
	import { linkIndex } from "$lib";

	const content = [
		{
			title: "Foundations",
			links: linkIndex.filter((item) => item.parent === "Foundations").map((item) => ({ label: item.name, href: item.url })),
		},
		{
			title: "Components",
			links: linkIndex.filter((item) => item.parent === "Components").map((item) => ({ label: item.name, href: item.url })),
		},
	];
	const url = $derived(page.url.pathname);
</script>

<div class="hidden md:flex flex-col gap-10 p-8 w-72 border-r">
	{#each content as section}
		<div class="flex flex-col gap-6">
			<h2 class="font-medium">{section.title}</h2>
			{#each section.links as link}
				<a href={link.href} class={cn("p-2.5 rounded-md hover:bg-muted -m-2.5", url === link.href ? "bg-accent" : "text-muted-foreground")}>
					{link.label}
				</a>
			{/each}
		</div>
	{/each}
</div>
