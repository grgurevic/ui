<script lang="ts">
	import { page } from "$app/state";
	import { cn } from "$lib/utils.js";
	import * as List from "$lib/components/ui/list";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import * as InputGroup from "$lib/components/ui/input-group";
	import {
		ChevronRight,
		ChevronLeft,
		Search,
		House,
		Sun,
		Moon,
		Settings,
		Compass,
		Menu,
		Sliders,
		ToggleLeft,
		Type,
		AlignLeft,
		ListOrdered,
		Layers,
		Sparkles,
		CreditCard,
		MessageSquare,
		PanelBottom,
		Minus,
		Activity,
	} from "@lucide/svelte";
	import { mode, setMode } from "mode-watcher";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import * as NavigationStack from "$lib/components/navigationStack";

	let { children } = $props();

	let searchQuery = $state("");

	// Component metadata
	const categories = [
		{
			name: "Navigation & Shell",
			items: [
				{ id: "navigation-stack", label: "Navigation Stack", path: "/components/navigation-stack", icon: Compass, color: "bg-primary" },
				{ id: "list", label: "List / Row", path: "/components/list", icon: Settings, color: "bg-primary" },
			],
		},
		{
			name: "Buttons & Actions",
			items: [
				{ id: "button", label: "Button", path: "/components/button", icon: Activity, color: "bg-primary" },
				{ id: "button-group", label: "Button Group", path: "/components/button-group", icon: Layers, color: "bg-primary" },
			],
		},
		{
			name: "Forms & Inputs",
			items: [
				{ id: "switch", label: "Switch", path: "/components/switch", icon: ToggleLeft, color: "bg-primary" },
				{ id: "slider", label: "Slider", path: "/components/slider", icon: Sliders, color: "bg-primary" },
				{ id: "select", label: "Select", path: "/components/select", icon: ListOrdered, color: "bg-primary" },
				{ id: "input", label: "Input", path: "/components/input", icon: Type, color: "bg-primary" },
				{ id: "input-group", label: "Input Group", path: "/components/input-group", icon: Search, color: "bg-primary" },
			],
		},
		{
			name: "Surfaces & Overlays",
			items: [
				{ id: "glass-view", label: "Glass View", path: "/components/glass-view", icon: Sparkles, color: "bg-primary" },
				{ id: "card", label: "Card", path: "/components/card", icon: CreditCard, color: "bg-primary" },
				{ id: "dialog", label: "Dialog", path: "/components/dialog", icon: MessageSquare, color: "bg-primary" },
				{ id: "sheet", label: "Sheet / Drawer", path: "/components/sheet", icon: PanelBottom, color: "bg-primary" },
				{ id: "dropdown-menu", label: "Dropdown Menu", path: "/components/dropdown-menu", icon: Menu, color: "bg-primary" },
			],
		},
	];

	// Filter categories based on search
	let filteredCategories = $derived.by(() => {
		if (!searchQuery.trim()) return categories;
		const query = searchQuery.toLowerCase();
		return categories
			.map((cat) => ({
				...cat,
				items: cat.items.filter((item) => item.label.toLowerCase().includes(query)),
			}))
			.filter((cat) => cat.items.length > 0);
	});

	// Check path details for routing and mobile views
	let currentPath = $derived(page.url.pathname);
	let isIndex = $derived(currentPath === "/components" || currentPath === "/components/");
</script>

<div class="flex flex-row w-screen min-h-screen bg-background text-foreground overflow-hidden">
	<aside class="w-full md:w-80 max-h-screen shrink-0 transition-all duration-300 relative z-30" class:hidden={!isIndex} class:md:flex={true}>
		<div class="flex flex-col items-stretch w-full bg-muted/0">
			<a href="/" class="p-6 flex flex-row items-center justify-between">
				<img src="/logo/logo_light.png" alt="logo" class="w-full dark:block hidden" />
				<img src="/logo/logo_dark.png" alt="logo" class="w-full dark:hidden block" />
			</a>

			<div class="px-6">
				<InputGroup.Root>
					<InputGroup.Addon>
						<Search class="size-4 text-muted-foreground" />
					</InputGroup.Addon>
					<InputGroup.Input bind:value={searchQuery} placeholder="Search components..." />
				</InputGroup.Root>
			</div>

			<div class="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-6">
				{#if filteredCategories.length === 0}
					<div class="flex flex-col items-center justify-center py-12 text-center">
						<span class="text-sm text-muted-foreground">No components matched "{searchQuery}"</span>
					</div>
				{:else}
					{#each filteredCategories as category}
						<List.Section header={category.name}>
							<List.Root>
								{#each category.items as item}
									<List.Row href={item.path}>
										<div class="flex flex-row items-center gap-3.5">
											<div class="size-7 flex items-center justify-center text-white rounded-lg shadow-sm {item.color}">
												<item.icon class="size-4" strokeWidth={2.5} />
											</div>
											<span class="text-sm font-medium text-foreground">{item.label}</span>
										</div>
										<ChevronRight class="size-4 text-muted-foreground/50" />
									</List.Row>
								{/each}
							</List.Root>
						</List.Section>
					{/each}
				{/if}
			</div>
		</div>
	</aside>

	<main class="flex-1 h-screen overflow-y-auto flex flex-col items-stretch relative" class:hidden={isIndex} class:md:flex={true}>
		<div class="flex-1 w-full">
			{@render children()}
		</div>
	</main>
</div>
