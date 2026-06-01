<script lang="ts">
	import * as NavigationStack from "$lib/components/navigationStack";
	import * as Select from "$lib/components/ui/select";
	import { Button } from "$lib/components/ui/button";
	import CodeBlock from "$lib/components/codeblock.svelte";
	import { ChevronLeft, Info, Sparkles } from "@lucide/svelte";

	// Select state
	let selectValue = $state("vanilla");

	const items = [
		{ value: "chocolate", label: "Chocolate 🍫" },
		{ value: "vanilla", label: "Vanilla 🍦" },
		{ value: "strawberry", label: "Strawberry 🍓" },
		{ value: "mint", label: "Mint Chocolate Chip 🌿" },
		{ value: "pistachio", label: "Pistachio 🫛" },
	];

	let selectedLabel = $derived(items.find((i) => i.value === selectValue)?.label ?? "");

	// Generated Code
	let generatedCode = $derived.by(() => {
		return `<script lang="ts">
	import * as Select from "$lib/components/ui/select";
	let selectValue = $state("${selectValue}");
</${"script"}>

<Select.Root bind:value={selectValue} type="single">
	<Select.Trigger class="w-full max-w-xs">
		{selectedLabel || "Select a flavor..."}
	</Select.Trigger>
	<Select.Content>
		<Select.Item value="chocolate" label="Chocolate 🍫" />
		<Select.Item value="vanilla" label="Vanilla 🍦" />
		<Select.Item value="strawberry" label="Strawberry 🍓" />
	</Select.Content>
</Select.Root>`;
	});
</script>

<NavigationStack.Root>
	<NavigationStack.Header title="Select">
		{#snippet leading()}
			<Button variant="translucent" size="icon" href="/components">
				<ChevronLeft class="size-4" />
			</Button>
		{/snippet}
	</NavigationStack.Header>

	<div class="flex flex-col gap-20 px-6 py-12 w-full max-w-4xl">
		<div class="flex flex-col gap-2">
			<NavigationStack.LargeTitle>Select</NavigationStack.LargeTitle>
			<p class="text-md text-muted-foreground max-w-2xl">
				A premium option picker combining the robust aria-accessibility standards of Bits UI with Grgurevic UI's custom glassmorphic trigger buttons and smooth slide-out dropdown boxes.
			</p>
		</div>

		<div class="flex flex-col gap-3">
			<span class="text-sm font-semibold text-muted-foreground ml-1">Preview</span>
			<div class="py-10 w-full flex flex-col items-center justify-center border-y border-border/10 gap-4">
				<div class="w-full max-w-xs flex flex-col gap-2">
					<span class="text-xs font-semibold text-muted-foreground ml-1">Ice Cream Flavor Picker</span>
					<Select.Root bind:value={selectValue} type="single">
						<Select.Trigger class="w-full">
							{selectedLabel || "Select a flavor..."}
						</Select.Trigger>
						<Select.Content>
							{#each items as item}
								<Select.Item value={item.value} label={item.label} />
							{/each}
						</Select.Content>
					</Select.Root>
				</div>

				<span class="text-xs text-muted-foreground font-semibold mt-2">
					Selected Value: <span class="text-primary font-bold">{selectValue}</span> ({selectedLabel})
				</span>
			</div>
		</div>

		<div class="flex flex-col gap-3 mt-4">
			<span class="text-sm font-semibold text-muted-foreground ml-1">Svelte Composition Code</span>
			<CodeBlock code={generatedCode} lang="svelte" />
		</div>

		<div class="flex flex-col gap-4 mt-8">
			<h3 class="text-base font-bold text-foreground ml-1">API & Sub-components Reference</h3>

			<div class="flex flex-col gap-6">
				<div class="flex flex-col gap-3 py-6 border-b border-border/10 last:border-b-0">
					<div class="flex items-center gap-2">
						<span class="font-mono font-bold text-primary text-sm">Select.Root</span>
					</div>
					<p class="text-sm text-muted-foreground">The master coordinator. Connects option items, active triggers, and keyboard focus states.</p>
					<ul class="text-xs font-mono flex flex-col gap-1 border-t border-border/10 pt-2 text-foreground/80 mt-1">
						<li>• <span class="font-bold text-primary">value:</span> string - Two-way bindable selected value.</li>
						<li>• <span class="font-bold text-primary">type:</span> "single" - Standard selection mode profile.</li>
					</ul>
				</div>

				<div class="flex flex-col gap-3 py-6 border-b border-border/10 last:border-b-0">
					<div class="flex items-center gap-2">
						<span class="font-mono font-bold text-primary text-sm">Select.Trigger</span>
					</div>
					<p class="text-sm text-muted-foreground">The tactile button displaying the selected option label that slides out the item picker list on clicking.</p>
				</div>

				<div class="flex flex-col gap-3 py-6 border-b border-border/10 last:border-b-0">
					<div class="flex items-center gap-2">
						<span class="font-mono font-bold text-primary text-sm">Select.Content</span>
					</div>
					<p class="text-sm text-muted-foreground">The floating glass card enclosing option items, styled with backdrop filters and shadows.</p>
				</div>

				<div class="flex flex-col gap-3 py-6 border-b border-border/10 last:border-b-0">
					<div class="flex items-center gap-2">
						<span class="font-mono font-bold text-primary text-sm">Select.Item</span>
					</div>
					<p class="text-sm text-muted-foreground">Clickable option element. Automatically appends trailing checkmarks when selected.</p>
				</div>
			</div>
		</div>
	</div>
</NavigationStack.Root>
