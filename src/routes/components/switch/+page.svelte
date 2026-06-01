<script lang="ts">
	import * as NavigationStack from "$lib/components/navigationStack";
	import { Switch } from "$lib/components/ui/switch";
	import * as Select from "$lib/components/ui/select";
	import CodeBlock from "$lib/components/codeblock.svelte";
	import { Button } from "$lib/components/ui/button";
	import { ChevronLeft, Info } from "@lucide/svelte";

	// Switch state
	let checked = $state(false);
	let disabled = $state(false);

	// Generated Code
	let generatedCode = $derived.by(() => {
		const props = [`bind:checked={checked}`];
		if (disabled) props.push(`disabled`);

		const propsStr = props.join(" ");
		return `<script lang="ts">
	let checked = $state(false);
	import { Switch } from "$lib/components/ui/switch";
</${"script"}>

<Switch ${propsStr} />`;
	});
</script>

<NavigationStack.Root>
	<NavigationStack.Header title="Switch">
		{#snippet leading()}
			<Button variant="translucent" size="icon" href="/components">
				<ChevronLeft class="size-4" />
			</Button>
		{/snippet}
	</NavigationStack.Header>

	<div class="flex flex-col gap-20 px-6 py-12 w-full max-w-4xl">
		<div class="flex flex-col gap-2">
<NavigationStack.LargeTitle>Switch</NavigationStack.LargeTitle>
			<p class="text-md text-muted-foreground max-w-2xl">
				A highly realistic toggle controller that mimics the organic mechanical inertia of native iOS controls. Supports direct dragging, finger pressure scaling, and spring physics.
			</p>
		</div>

		<div class="flex flex-col gap-3">
			<span class="text-sm font-semibold text-muted-foreground ml-1 font-medium flex items-center gap-1.5">
				<Info class="size-4 text-primary" /> Drag the thumb left/right to feel the spring squeeze physics!
			</span>
			<div class="py-10 w-full flex flex-col items-center justify-center border-y border-border/10 gap-4">
				<Switch bind:checked {disabled} />
				<span class="text-xs text-muted-foreground font-semibold">
					State: {checked ? "Checked" : "Unchecked"}
				</span>
			</div>
		</div>

		<div class="flex flex-col gap-8 mt-4 w-full">
			<div class="flex flex-col gap-6">
				<span class="text-sm font-semibold text-muted-foreground ml-1">Configuration</span>



				<div class="flex flex-col gap-4 border-t border-border/20 pt-4">
					<div class="flex flex-row justify-between items-center">
						<div class="flex flex-col gap-0.5">
							<span class="text-sm font-medium">Toggle Programmatically</span>
							<span class="text-xs text-muted-foreground">Trigger state via external binding</span>
						</div>
						<Button size="sm" variant="bordered" onclick={() => checked = !checked}>Toggle</Button>
					</div>

					<div class="flex flex-row justify-between items-center border-t border-border/10 pt-4">
						<div class="flex flex-col gap-0.5">
							<span class="text-sm font-medium">Disabled State</span>
							<span class="text-xs text-muted-foreground">Disables interaction while dimming state</span>
						</div>
						<Switch bind:checked={disabled} />
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-3">
				<span class="text-sm font-semibold text-muted-foreground ml-1">Installation</span>
				<CodeBlock code="npx shadcn-svelte@latest add https://ui.grgurevic.click/r/switch.json" lang="bash" />
			</div>

			<div class="flex flex-col gap-3">
				<span class="text-sm font-semibold text-muted-foreground ml-1">Svelte Composition Code</span>
				<div class="flex flex-col gap-3">
					<CodeBlock code={generatedCode} lang="svelte" />
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-4 mt-8">
			<h3 class="text-base font-bold text-foreground ml-1">API & Props Reference</h3>
			<div class="w-full overflow-x-auto py-4">
				<table class="w-full text-sm border-collapse text-left">
					<thead>
						<tr class="bg-muted/30 border-b border-border/20">
							<th class="p-4 font-semibold text-foreground/80">Prop</th>
							<th class="p-4 font-semibold text-foreground/80">Type</th>
							<th class="p-4 font-semibold text-foreground/80">Default</th>
							<th class="p-4 font-semibold text-foreground/80">Description</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-border/10">
						<tr>
							<td class="p-4 font-mono font-bold text-primary">checked</td>
							<td class="p-4 font-mono text-xs">boolean</td>
							<td class="p-4 font-mono text-xs">false</td>
							<td class="p-4 text-muted-foreground">Two-way bindable state property indicating toggled state.</td>
						</tr>

						<tr>
							<td class="p-4 font-mono font-bold text-primary">disabled</td>
							<td class="p-4 font-mono text-xs">boolean</td>
							<td class="p-4 font-mono text-xs">false</td>
							<td class="p-4 text-muted-foreground">Disables clicks and pointer listeners while opacity-scaling down.</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</NavigationStack.Root>
