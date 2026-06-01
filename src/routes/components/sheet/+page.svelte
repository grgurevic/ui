<script lang="ts">
	import * as NavigationStack from "$lib/components/navigationStack";
	import * as Sheet from "$lib/components/ui/sheet";
	import { Button } from "$lib/components/ui/button";
	import { Switch } from "$lib/components/ui/switch";
	import * as Select from "$lib/components/ui/select";
	import CodeBlock from "$lib/components/codeblock.svelte";
	import { ChevronLeft, Compass, Info, X } from "@lucide/svelte";

	// Sheet state
	let side = $state<"top" | "right" | "bottom" | "left">("bottom");
	let showCloseButton = $state(true);

	const sides = [
		{ value: "top", label: "Top Pull-down" },
		{ value: "bottom", label: "Bottom Sheet (iOS-Style)" },
		{ value: "left", label: "Left Drawer" },
		{ value: "right", label: "Right Sidebar" },
	];

	let activeSideLabel = $derived(sides.find((s) => s.value === side)?.label ?? "Select a side");

	// Generated Code
	let generatedCode = $derived.by(() => {
		const props = [`side="${side}"`];
		if (!showCloseButton) props.push(`showCloseButton={false}`);

		const propsStr = props.join(" ");
		return `<script lang="ts">
	import * as Sheet from "$lib/components/ui/sheet";
	import { Button } from "$lib/components/ui/button";
</${"script"}>

<Sheet.Root>
	<Sheet.Trigger>
		<Button>Open Sheet</Button>
	</Sheet.Trigger>
	<Sheet.Content ${propsStr}>
		<Sheet.Header>
			<Sheet.Title>Sheet Title</Sheet.Title>
			<Sheet.Description>Detailed description goes here.</Sheet.Description>
		</Sheet.Header>
		<div class="p-6">
			<!-- Custom sheet content -->
		</div>
		<Sheet.Footer>
			<Button>Save Changes</Button>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>`;
	});
</script>

<NavigationStack.Root>
	<NavigationStack.Header title="Sheet">
		{#snippet leading()}
			<Button variant="translucent" size="icon" href="/components">
				<ChevronLeft class="size-4" />
			</Button>
		{/snippet}
	</NavigationStack.Header>

	<div class="flex flex-col gap-20 px-6 py-12 w-full max-w-4xl">
		<div class="flex flex-col gap-2">
			<NavigationStack.LargeTitle>Sheet</NavigationStack.LargeTitle>
			<p class="text-md text-muted-foreground max-w-2xl">
				Multi-directional modal sheets that slide fluidly from the edges of the screen. Specially tuned with backdrop filter blurs, corner curves, and clean dismiss triggers.
			</p>
		</div>

		<div class="flex flex-col gap-3">
			<span class="text-sm font-semibold text-muted-foreground ml-1">Preview</span>
			<div class="py-10 w-full flex flex-col items-center justify-center border-y border-border/10 gap-4">
				<Sheet.Root>
					<Sheet.Trigger>
						{#snippet child({ props })}
							<Button variant="prominent" class="shadow-xl" {...props}>
								Open {side} Sheet
							</Button>
						{/snippet}
					</Sheet.Trigger>
					<Sheet.Content {side} {showCloseButton}>
						<Sheet.Header>
							<Sheet.Title>Apple-style Sheet Drawer</Sheet.Title>
							<Sheet.Description>This overlay container smoothly slides in from the {side} edge of your screen.</Sheet.Description>
						</Sheet.Header>

						<div class="flex-1 py-8 flex flex-col items-center justify-center gap-4 text-center">
							<div class="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
								<Compass class="size-6 animate-pulse" />
							</div>
							<div class="flex flex-col gap-1 max-w-xs">
								<span class="font-semibold text-sm">Responsive Layout Shell</span>
								<span class="text-xs text-muted-foreground">You can easily nest inputs, graphs, custom sliders, or settings lists inside sheet panels.</span>
							</div>
						</div>

						<Sheet.Footer class="flex flex-row gap-2 justify-end w-full">
							<Sheet.Close>
								{#snippet child({ props })}
									<Button variant="bordered" class="flex-1 sm:flex-initial" {...props}>Cancel</Button>
								{/snippet}
							</Sheet.Close>
							<Sheet.Close>
								{#snippet child({ props })}
									<Button variant="prominent" class="flex-1 sm:flex-initial" {...props}>Save Changes</Button>
								{/snippet}
							</Sheet.Close>
						</Sheet.Footer>
					</Sheet.Content>
				</Sheet.Root>
			</div>
		</div>

		<div class="flex flex-col gap-8 mt-4 w-full">
			<div class="flex flex-col gap-6">
				<span class="text-sm font-semibold text-muted-foreground ml-1">Configuration</span>

				<div class="flex flex-col gap-2">
					<label class="text-xs font-semibold text-muted-foreground">Slide Orientation (Side)</label>
					<Select.Root value={side} type="single" onValueChange={(val) => (side = val as any)}>
						<Select.Trigger class="w-full">
							{activeSideLabel}
						</Select.Trigger>
						<Select.Content>
							{#each sides as item}
								<Select.Item value={item.value} label={item.label} />
							{/each}
						</Select.Content>
					</Select.Root>
				</div>

				<div class="flex flex-col gap-4 border-t border-border/20 pt-4">
					<div class="flex flex-row justify-between items-center">
						<div class="flex flex-col gap-0.5">
							<span class="text-sm font-medium">Render Close Button</span>
							<span class="text-xs text-muted-foreground">Shows the top-right 'X' button helper</span>
						</div>
						<Switch bind:checked={showCloseButton} />
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-3">
				<span class="text-sm font-semibold text-muted-foreground ml-1">Installation</span>
				<CodeBlock code="npx shadcn-svelte@latest add https://ui.grgurevic.click/r/sheet.json" lang="bash" />
			</div>

			<div class="flex flex-col gap-3">
				<span class="text-sm font-semibold text-muted-foreground ml-1">Svelte Composition Code</span>
				<div class="flex flex-col gap-3">
					<CodeBlock code={generatedCode} lang="svelte" />
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-4 mt-8">
			<h3 class="text-base font-bold text-foreground ml-1">API & Sub-components Reference</h3>

			<div class="flex flex-col gap-6">
				<div class="flex flex-col gap-3 py-6 border-b border-border/10 last:border-b-0">
					<div class="flex items-center gap-2">
						<span class="font-mono font-bold text-primary text-sm">Sheet.Root</span>
					</div>
					<p class="text-sm text-muted-foreground">Coordinates dynamic viewport opening states, overlays, focus locks, and overlay blurs.</p>
				</div>

				<div class="flex flex-col gap-3 py-6 border-b border-border/10 last:border-b-0">
					<div class="flex items-center gap-2">
						<span class="font-mono font-bold text-primary text-sm">Sheet.Trigger</span>
					</div>
					<p class="text-sm text-muted-foreground">The clickable element (like a Button) that triggers opening callbacks.</p>
				</div>

				<div class="flex flex-col gap-3 py-6 border-b border-border/10 last:border-b-0">
					<div class="flex items-center gap-2">
						<span class="font-mono font-bold text-primary text-sm">Sheet.Content</span>
					</div>
					<p class="text-sm text-muted-foreground">The primary overlay panel styled with Svelte edge slides, progressive shadows, and round layouts.</p>
					<ul class="text-xs font-mono flex flex-col gap-1 border-t border-border/10 pt-2 text-foreground/80 mt-1">
						<li>• <span class="font-bold text-primary">side:</span> "left" | "right" | "top" | "bottom" - Cardinal direction slide path.</li>
						<li>• <span class="font-bold text-primary">showCloseButton:</span> boolean (true) - Displays upper corner click dismisses.</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</NavigationStack.Root>
