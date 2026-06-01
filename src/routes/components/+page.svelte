<script lang="ts">
	import * as NavigationStack from "$lib/components/navigationStack";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { GlassView } from "$lib/components/ui/glass-view";
	import { Activity, ChevronLeft, Layers, Sparkles } from "@lucide/svelte";
</script>

<NavigationStack.Root>
	<NavigationStack.Header title="Grgurevic UI">
		{#snippet leading()}
			<Button variant="translucent" size="icon" href="/">
				<ChevronLeft class="size-4" />
			</Button>
		{/snippet}
	</NavigationStack.Header>

	<div class="flex flex-col gap-12 p-6 w-full max-w-4xl">
		<div class="flex flex-col gap-2">
			<NavigationStack.LargeTitle>Grgurevic UI</NavigationStack.LargeTitle>
			<p class="text-lg text-muted-foreground font-normal max-w-2xl">Welcome to Grgurevic UI. A highly Apple-inspired component library made for Svelte 5.</p>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
			<Card.Root scale={true} magnetic={true} ripple={true} specular={true} class="select-none">
				<Card.Header>
					<Card.Title class="flex items-center gap-2">
						<Activity class="size-5 text-primary" />
						Stretchyness
					</Card.Title>
					<Card.Description>Scaling with physics.</Card.Description>
				</Card.Header>
				<Card.Content>
					<p class="text-sm text-muted-foreground">Try clicking and dragging cards and buttons in this library. And you'll see what im talking about.</p>
				</Card.Content>
			</Card.Root>

			<Card.Root scale={true} magnetic={true} ripple={true} specular={true} class="select-none">
				<Card.Header>
					<Card.Title class="flex items-center gap-2">
						<Sparkles class="size-5 text-primary" />
						Specular Highlights
					</Card.Title>
					<Card.Description>Responsive lighting effects.</Card.Description>
				</Card.Header>
				<Card.Content>
					<p class="text-sm text-muted-foreground">Every interactive element reacts to cursor movements and then adds a specular highlight.</p>
				</Card.Content>
			</Card.Root>
		</div>

		<Card.Root>
			<Card.Header>
				<Card.Title class="flex items-center gap-2">
					<Layers class="size-5 text-primary" />
					Interactive Glass View
				</Card.Title>
				<Card.Description>Hover and drag the glass block to test physics.</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="flex items-center justify-center h-72 bg-[url(/bg.png)] bg-cover rounded-lg relative">
					<GlassView variant="translucent" scale={true} magnetic={true} specular={true} class="w-48 h-16 flex items-center justify-center select-none">Drag & Pull Me</GlassView>
				</div>
			</Card.Content>
		</Card.Root>

		<Card.Root scale={true} magnetic={true} ripple={true} specular={true}>
			<Card.Content>
				<span class="text-muted-foreground">Select a component from the sidebar menu to view its detailed options.</span>
			</Card.Content>
		</Card.Root>
	</div>
</NavigationStack.Root>
