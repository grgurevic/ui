<script lang="ts">
	import CodeAccordion from "$lib/components/code-accordion.svelte";
	import Codeblock from "$lib/components/codeblock.svelte";
	import { Button } from "$lib/components/ui/button";
	import * as Sheet from "$lib/components/ui/sheet";
	import { Switch } from "$lib/components/ui/switch";
	import * as Select from "$lib/components/ui/select";
	import { Compass, Sparkles } from "@lucide/svelte";

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
</\${"script"}>

<Sheet.Root>
	<Sheet.Trigger>
		<Button variant="prominent">Open Sheet</Button>
	</Sheet.Trigger>
	<Sheet.Content ${propsStr} liquidGlass={true}>
		<Sheet.Header>
			<Sheet.Title>Drawer Menu</Sheet.Title>
			<Sheet.Description>Responsive slide-over panel content.</Sheet.Description>
		</Sheet.Header>
		<div class="p-6">
			<!-- Custom content -->
		</div>
	</Sheet.Content>
</Sheet.Root>`;
	});
</script>

<div class="flex flex-col gap-4 w-full p-12 border-b">
	<h1 class="text-4xl font-semibold">Sheet</h1>
	<p class="text-lg text-muted-foreground">Multi-directional modal sheets that slide fluidly from the edges of the screen, styled with backdrop blurs and clean dismiss triggers.</p>
	<Codeblock code="bunx shadcn-svelte@latest add https://ui.grgurevic.click/r/sheet.json" lang="bash" classes="rounded-md border" />
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Usage</h1>
		<p class="text-md text-muted-foreground">Select a slide-in direction and open the sheet.</p>
	</div>
	<CodeAccordion code={generatedCode}>
		<div class="w-full max-w-xs flex flex-col gap-2">
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

		<div class="flex flex-row items-center gap-4">
			<label for="renderX">Render close button</label>
			<Switch id="renderX" bind:checked={showCloseButton} />
		</div>

		<Sheet.Root>
			<Sheet.Trigger>
				{#snippet child({ props })}
					<Button variant="prominent" class="w-fit" {...props}>
						Open {side} Sheet
					</Button>
				{/snippet}
			</Sheet.Trigger>
			<Sheet.Content {side} {showCloseButton} liquidGlass={true}>
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
	</CodeAccordion>
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Best practices</h1>
		<p class="text-md text-muted-foreground">The best practices when using sheet components.</p>
	</div>
	<ul class="list-disc pl-5 flex flex-col gap-4 text-muted-foreground">
		<li>Use the bottom drawer layout on mobile screens to ensure thumb-friendly actions.</li>
		<li>Keep the drawer content scrollable if it exceeds the vertical screen height.</li>
		<li>
			Display a clear close action icon or footer cancel <a class="inline-flex items-center gap-1 text-primary hover:underline align-middle" href="/components/button"><img src="/logo/pictorial.png" alt="logo" class="size-4" />Button</a> for quick dismissals.
		</li>
		<li>
			For actions requiring explicit user confirmation, use a <a class="inline-flex items-center gap-1 text-primary hover:underline align-middle" href="/components/dialog"><img src="/logo/pictorial.png" alt="logo" class="size-4" />Dialog</a> instead to block background interaction entirely.
		</li>
	</ul>
</div>

<div class="flex flex-col gap-6 w-full p-12">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Components & Props</h1>
		<p class="text-md text-muted-foreground">Sheet sub-components and customization parameters.</p>
	</div>
	<div class="w-full overflow-x-auto border rounded-md bg-card">
		<table class="w-full text-sm text-left">
			<thead>
				<tr class="border-b">
					<th class="p-4 font-semibold text-foreground">Component / Prop</th>
					<th class="p-4 font-semibold text-foreground">Type / Role</th>
					<th class="p-4 font-semibold text-foreground">Default</th>
					<th class="p-4 font-semibold text-foreground">Description</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-border">
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">Sheet.Root</td>
					<td class="p-4 text-muted-foreground font-sans">Master controller</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">-</td>
					<td class="p-4 text-muted-foreground">Coordinates viewport opening states, overlays, focus locks, and blurs.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">Sheet.Trigger</td>
					<td class="p-4 text-muted-foreground font-sans">Trigger element</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">-</td>
					<td class="p-4 text-muted-foreground">The clickable button or handler that triggers sheet display.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">Sheet.Content</td>
					<td class="p-4 text-muted-foreground font-sans">Drawer panel</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">-</td>
					<td class="p-4 text-muted-foreground">The slide-over container. Takes `side="top" | "bottom" | "left" | "right"`.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">showCloseButton</td>
					<td class="p-4 font-mono text-xs">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">true</td>
					<td class="p-4 text-muted-foreground">Displays standard top-right close icon trigger.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">liquidGlass</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">false</td>
					<td class="p-4 text-muted-foreground">Enables physical liquid glass refraction distortion (Chromium only).</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
