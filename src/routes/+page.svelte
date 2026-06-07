<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Switch } from "$lib/components/ui/switch";
	import { Slider } from "$lib/components/ui/slider";
	import * as ButtonGroup from "$lib/components/ui/button-group";
	import * as NavigationStack from "$lib/components/navigationStack";
	import { ChevronRight, Sparkles, Layers, Check, Share, Settings, Sun, Moon, Activity, Ellipsis, ChevronLeft, Cloud, Lock, House } from "@lucide/svelte";
	import { mode, setMode } from "mode-watcher";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Footer } from "$lib/components/ui/card";
	import { GlassView } from "$lib/components/ui/glass-view";

	let ecoMode = $state(true);
	let storageUsage = $state(60);

	let themeIcon = $derived(mode.current === "light" ? Sun : Moon);
</script>

<svelte:head>
	<title>Liquid Glass Svelte Components - Grgurevic UI</title>
	<meta name="description" content="Build premium web interfaces with Grgurevic UI, a Svelte 5 component library featuring physics-based elastic cards, specular highlights, and real refractive Liquid Glass." />
	<meta name="keywords" content="liquid glass svelte, svelte liquid glass, svelte 5 liquid glass, refractive glass svelte, svelte glassmorphism" />
</svelte:head>

<NavigationStack.Root>
	<NavigationStack.Header title="">
		{#snippet leading()}
			<img src="/logo/logo_light.png" alt="logo" class="h-10 md:h-12 dark:block hidden" />
			<img src="/logo/logo_dark.png" alt="logo" class="h-10 md:h-12 dark:hidden block" />
		{/snippet}
		{#snippet trailing()}
			<div class="flex flex-row gap-2">
				<Button variant="translucent" href="/components">
					Components <ChevronRight class="size-4" />
				</Button>

				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Button variant="translucent" size="icon"><svelte:component this={themeIcon} class="size-4" /></Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="w-48" align="end">
						<DropdownMenu.Label>Theme Settings</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.RadioGroup value={mode.current} onValueChange={(val) => setMode(val as any)}>
							<DropdownMenu.RadioItem value="light">
								<Sun class="mr-2 size-4" />
								<span>Light Mode</span>
							</DropdownMenu.RadioItem>
							<DropdownMenu.RadioItem value="dark">
								<Moon class="mr-2 size-4" />
								<span>Dark Mode</span>
							</DropdownMenu.RadioItem>
							<DropdownMenu.RadioItem value="system">
								<Settings class="mr-2 size-4" />
								<span>System Default</span>
							</DropdownMenu.RadioItem>
						</DropdownMenu.RadioGroup>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		{/snippet}
	</NavigationStack.Header>

	<div class="flex flex-col items-center w-full min-h-screen px-6 py-12 md:py-24 relative overflow-hidden gap-16 md:gap-24">
		<div class="flex flex-col items-center max-w-3xl text-center gap-6 z-10">
			<NavigationStack.LargeTitle class="text-5xl md:text-7xl">Grgurevic UI</NavigationStack.LargeTitle>

			<p class="text-lg md:text-xl text-muted-foreground font-normal max-w-2xl leading-relaxed">
				A premium Svelte 5 UI library built on top of shadcn-svelte. Recreate Apple's premium design aesthetics with elastic physics, specular cursor-tracking highlights, and fluid, refractive <strong>Liquid Glass in Svelte</strong>.
			</p>

			<Button variant="prominent" size="lg" href="/components">
				Explore Components
				<ChevronRight />
			</Button>
		</div>

		<div id="core-features" class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl z-10">
			<Card.Root class="w-full h-full shadow-2xl">
				<Card.Header>
					<Card.Title class="flex items-center gap-2">
						<Activity class="size-5 text-primary" />Thermostat
					</Card.Title>
					<Card.Description>Your apartment is too hot. Let the card tell you.</Card.Description>
					<Card.Action>
						<Button variant="ghost" size="icon-xs"><Ellipsis class="size-4" /></Button>
					</Card.Action>
				</Card.Header>
				<Card.Content class="flex flex-col gap-6">
					<div class="flex items-center justify-between p-4">
						<div class="flex flex-col gap-0.5">
							<span class="text-2xs text-muted-foreground font-semibold uppercase">Current Temp</span>
							<span class="text-3xl font-bold text-foreground">24°C</span>
						</div>
						<div class="flex flex-col gap-0.5 items-end">
							<span class="text-2xs text-muted-foreground font-semibold uppercase">Target Temp</span>
							<span class="text-3xl font-bold text-primary">16°C</span>
						</div>
					</div>
					<div class="flex flex-row justify-between items-center">
						<span class="text-sm font-medium">Eco mode</span>
						<Switch bind:checked={ecoMode} />
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root class="w-full h-full shadow-2xl">
				<Card.Header>
					<Card.Title class="flex items-center gap-2">
						<Cloud class="size-5 text-primary" />Cloud storage
					</Card.Title>
					<Card.Description>You're paying $2.99/mo for this.</Card.Description>
					<Card.Action>
						<Button variant="ghost" size="icon-xs"><ChevronRight class="size-4" /></Button>
					</Card.Action>
				</Card.Header>
				<Card.Content class="flex flex-col gap-5">
					<div class="flex flex-col gap-2">
						<div class="flex justify-between text-xs font-semibold">
							<span class="text-muted-foreground">drag this around</span>
							<span>{storageUsage}% gone 💸</span>
						</div>
						<Slider bind:value={storageUsage} type="single" min={10} max={90} />
					</div>
					<div class="flex flex-row justify-between p-2">
						<div class="flex flex-col gap-0.5 items-center">
							<span class="text-3xs text-muted-foreground font-semibold uppercase">Docs</span>
							<span class="text-xs font-bold">450 GB</span>
						</div>
						<div class="flex flex-col gap-0.5 items-center">
							<span class="text-3xs text-muted-foreground font-semibold uppercase">Photos</span>
							<span class="text-xs font-bold">680 GB</span>
						</div>
						<div class="flex flex-col gap-0.5 items-center">
							<span class="text-3xs text-muted-foreground font-semibold uppercase">Shared</span>
							<span class="text-xs font-bold">280 GB</span>
						</div>
					</div>
				</Card.Content>
			</Card.Root>
		</div>

		<div class="flex flex-col items-center max-w-4xl w-full z-10 gap-12">
			<div class="text-center flex flex-col items-center gap-2">
				<h2 class="text-3xl font-bold text-foreground">Why does it look like that</h2>
				<p class="text-sm text-muted-foreground max-w-md">Three things that you will probably see in the docs</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
				<Card.Root>
					<Card.Header>
						<Sparkles class="size-4 my-1 text-primary" />
						<Card.Title class="text-base font-bold">Specular highlights</Card.Title>
					</Card.Header>
					<Card.Content>
						<p class="text-xs text-muted-foreground">Border highlights that follow your cursor around and pretend to be light. its math. move your mouse over a card.</p>
					</Card.Content>
				</Card.Root>

				<Card.Root>
					<Card.Header>
						<Activity class="size-4 my-1 text-primary" />
						<Card.Title class="text-base font-bold">Jiggly slider</Card.Title>
					</Card.Header>
					<Card.Content>
						<p class="text-xs text-muted-foreground">Sliders and switches that stretch when you fling them. drag it fast and let go. you'll see.</p>
					</Card.Content>
				</Card.Root>

				<Card.Root>
					<Card.Header>
						<Layers class="size-4 my-1 text-primary" />
						<Card.Title class="text-base font-bold">Refractive Liquid Glass</Card.Title>
					</Card.Header>
					<Card.Content>
						<p class="text-xs text-muted-foreground">True refractive SVG filters simulating real glass light bending in Svelte. Dynamic control over IOR, bezel width, and chromatic aberration.</p>
					</Card.Content>
				</Card.Root>
			</div>

			<div class="flex flex-col items-center gap-4 py-8">
				<h3 class="text-xl font-bold text-foreground text-center">Why is it named "Grgurevic UI"?</h3>
				<div class="flex flex-col sm:flex-row gap-4">
					<p class="text-xs text-muted-foreground max-w-md">Because im Vigo Grgurević and i wanted to make a UI library.</p>
				</div>
			</div>

			<div class="flex flex-col items-center gap-4 py-8">
				<h3 class="text-xl font-bold text-foreground text-center">wrap it up, wheres the code</h3>
				<div class="flex flex-col sm:flex-row gap-4">
					<Button variant="prominent" size="lg" href="/components" class="gap-1.5 shadow-md">
						Components Showcase <ChevronRight class="size-4" />
					</Button>
				</div>
			</div>
		</div>

		<Footer />
	</div>
</NavigationStack.Root>
