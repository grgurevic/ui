<script lang="ts">
	import CodeAccordion from "$lib/components/code-accordion.svelte";
	import Codeblock from "$lib/components/codeblock.svelte";
	import { Button } from "$lib/components/ui/button";
	import * as Select from "$lib/components/ui/select";
	import { Sparkles } from "@lucide/svelte";

	let selectValue = $state("vanilla");

	const items = [
		{ value: "chocolate", label: "Chocolate 🍫" },
		{ value: "vanilla", label: "Vanilla 🍦" },
		{ value: "strawberry", label: "Strawberry 🍓" },
		{ value: "mint", label: "Mint Chocolate Chip 🌿" },
		{ value: "pistachio", label: "Pistachio 🫛" },
	];

	let selectedLabel = $derived(items.find((i) => i.value === selectValue)?.label ?? "");
</script>

<div class="flex flex-col gap-4 w-full p-12 border-b">
	<h1 class="text-4xl font-semibold">Select</h1>
	<p class="text-lg text-muted-foreground">A premium option picker combining bits-ui accessibility standards with custom glassmorphic trigger buttons and slide-out dropdown menus.</p>
	<Codeblock code="bunx shadcn-svelte@latest add https://ui.grgurevic.click/r/select.json" lang="bash" classes="rounded-md border" />
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Usage</h1>
		<p class="text-md text-muted-foreground">An option selection popup listing ice cream flavors.</p>
	</div>
	<CodeAccordion
		code={`<${"script"} lang="ts">
	import * as Select from "$lib/components/ui/select";
	let selectValue = $state("vanilla");
</${"script"}>

<Select.Root bind:value={selectValue} type="single">
	<Select.Trigger class="w-full max-w-xs" liquidGlass={true}>
		{selectValue || "Select a flavor..."}
	</Select.Trigger>
	<Select.Content liquidGlass={true}>
		<Select.Item value="chocolate" label="Chocolate 🍫" />
		<Select.Item value="vanilla" label="Vanilla 🍦" />
		<Select.Item value="strawberry" label="Strawberry 🍓" />
	</Select.Content>
</Select.Root>`}
	>
		<div class="w-full max-w-xs flex flex-col gap-4 select-none">
			<Select.Root bind:value={selectValue} type="single">
				<Select.Trigger class="w-full" liquidGlass={true}>
					{selectedLabel || "Select a flavor..."}
				</Select.Trigger>
				<Select.Content liquidGlass={true}>
					{#each items as item}
						<Select.Item value={item.value} label={item.label} />
					{/each}
				</Select.Content>
			</Select.Root>
			<span class="text-xs text-muted-foreground font-semibold bg-background/50 backdrop-blur border px-3 py-1 rounded-full shadow-sm">
				Selected flavor: <span class="text-primary font-bold">{selectValue}</span>
			</span>
		</div>
	</CodeAccordion>
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Best practices</h1>
		<p class="text-md text-muted-foreground">The best practices when using select controls.</p>
	</div>
	<ul class="list-disc pl-5 flex flex-col gap-4 text-muted-foreground">
		<li>Add descriptive placeholders when no value is chosen.</li>
		<li>
			Limit the number of dropdown options to prevent vertical viewport overflow. For large option sets, prefer a <a class="inline-flex items-center gap-1 text-primary hover:underline align-middle" href="/components/sheet"><img src="/logo/pictorial.png" alt="logo" class="size-4" />Sheet</a> with a searchable list.
		</li>
		<li>Use clear, descriptive labels for each option instead of short abbreviations.</li>
		<li>
			For simple binary choices, consider a <a class="inline-flex items-center gap-1 text-primary hover:underline align-middle" href="/components/switch"><img src="/logo/pictorial.png" alt="logo" class="size-4" />Switch</a> or <a class="inline-flex items-center gap-1 text-primary hover:underline align-middle" href="/components/button-group"><img src="/logo/pictorial.png" alt="logo" class="size-4" />Button Group</a> as a more compact alternative.
		</li>
	</ul>
</div>

<div class="flex flex-col gap-6 w-full p-12">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Components & Props</h1>
		<p class="text-md text-muted-foreground">Select sub-components and customization parameters.</p>
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
					<td class="p-4 font-mono font-bold text-foreground">Select.Root</td>
					<td class="p-4 text-muted-foreground font-sans">Context coordinator</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">-</td>
					<td class="p-4 text-muted-foreground">The master coordinator. Connects option items, active triggers, and keyboard focus states.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">Select.Trigger</td>
					<td class="p-4 text-muted-foreground font-sans">Tactile button trigger</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">-</td>
					<td class="p-4 text-muted-foreground">The tactile button displaying the selected option label that slides out the item picker list on clicking.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">Select.Content</td>
					<td class="p-4 text-muted-foreground font-sans">Popover container</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">-</td>
					<td class="p-4 text-muted-foreground">The floating glass card enclosing option items, styled with backdrop filters and shadows.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">Select.Item</td>
					<td class="p-4 text-muted-foreground font-sans">Option element</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">-</td>
					<td class="p-4 text-muted-foreground">Clickable option element. Automatically appends trailing checkmarks when selected.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">value</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">string</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">""</td>
					<td class="p-4 text-muted-foreground">Two-way bindable selected value.</td>
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
