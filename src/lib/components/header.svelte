<script lang="ts">
	import { browser } from "$app/environment";
	import { page } from "$app/state";
	import { Book, Menu, X, Layers, Search } from "@lucide/svelte";
	import { Button } from "./ui/button";
	import CommandPalette from "./command-palette.svelte";

	let open = $state(false);
	let searchOpen = $state(false);

	const links = [
		{
			name: "Introduction",
			icon: Book,
			href: "/",
		},
		{
			name: "Components",
			icon: Layers,
			href: "/components/button",
		},
	];
</script>

<CommandPalette bind:open={searchOpen} />

<div class="relative w-full flex flex-col justify-center items-center mb-2">
	<div class="flex flex-row items-center max-w-6xl w-full py-6 justify-between px-8 xl:py-6 xl:px-0">
		<!--wtf ? fixed it w -mb-2 lol-->
		<a href="/" class="-mb-2">
			<img src="/logo/logo_light.png" alt="logo" class="h-11 md:h-14 dark:block hidden" />
			<img src="/logo/logo_dark.png" alt="logo" class="h-11 md:h-14 dark:hidden block" />
		</a>
		<nav aria-label="Glavna navigacija" class="flex-row items-center gap-2 hidden xl:flex">
			{#each links as link}
				<Button variant="ghost" class="bg-secondary/60" href={link.href}>
					<link.icon />
					{link.name}
				</Button>
			{/each}
			<Button onclick={() => (searchOpen = true)} variant="ghost" class="bg-secondary/60">
				<Search />
				Search
				<kbd class="ml-1 flex items-center gap-2 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
					<span>⌘</span><span>K</span>
				</kbd>
			</Button>
		</nav>
		<div class="flex xl:hidden gap-2">
			<button
				onclick={() => (searchOpen = true)}
				class="inline-flex shrink-0 items-center justify-center rounded-xs border text-muted-foreground font-light bg-background/40 size-10 hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer"
				aria-label="Search"
			>
				<Search class="size-5" />
			</button>
			<button
				class="inline-flex shrink-0 items-center justify-center rounded-xs border text-muted-foreground font-light bg-background/40 size-10 hover:bg-accent hover:text-accent-foreground transition-all cursor-pointer"
				aria-label="Menu"
				onclick={() => (open = !open)}
			>
				{#if open}
					<X class="size-5" />
				{:else}
					<Menu class="size-5" />
				{/if}
			</button>
		</div>
	</div>
	{#if open}
		<nav
			aria-label="Mobilna navigacija"
			class="xl:hidden absolute top-full left-0 w-full flex flex-col items-center gap-4 p-8 pt-8 bg-background/95 backdrop-blur-xl border-y header-links z-50 shadow-lg"
		>
			{#each links as link}
				<Button variant="translucent" class="w-full" href={link.href} onclick={() => (open = false)}>
					<link.icon size={20} />
					{link.name}
				</Button>
			{/each}
		</nav>
	{/if}
</div>
