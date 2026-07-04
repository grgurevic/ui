<script lang="ts">
	import CodeAccordion from "$lib/components/code-accordion.svelte";
	import Codeblock from "$lib/components/codeblock.svelte";
	import { Switch } from "$lib/components/ui/switch";

	let checked = $state(false);
</script>

<div class="flex flex-col gap-4 w-full p-12 border-b">
	<h1 class="text-4xl font-semibold">Switch</h1>
	<p class="text-lg text-muted-foreground">A highly realistic toggle controller that mimics the organic mechanical inertia of native iOS controls.</p>
	<Codeblock code="bunx shadcn-svelte@latest add https://ui.grgurevic.click/r/switch.json" lang="bash" classes="rounded-md border" />
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Usage</h1>
		<p class="text-md text-muted-foreground">A basic on/off toggle switch. Drag the thumb left or right to feel the spring physics.</p>
	</div>
	<CodeAccordion
		code={`<${"script"} lang="ts">
	import { Switch } from "$lib/components/ui/switch";
	let checked = $state(false);
</${"script"}>

<Switch bind:checked={checked} />`}
	>
		<Switch bind:checked />
	</CodeAccordion>
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Disabled</h1>
		<p class="text-md text-muted-foreground">Switches can be disabled to prevent user interaction.</p>
	</div>
	<CodeAccordion
		code={`<Switch disabled />
<Switch checked={true} disabled />`}
	>
		<div class="flex flex-row gap-4">
			<Switch disabled />
			<Switch checked={true} disabled />
		</div>
	</CodeAccordion>
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Best practices</h1>
		<p class="text-md text-muted-foreground">The best practices when using toggle switches.</p>
	</div>
	<ul class="list-disc pl-5 flex flex-col gap-4 text-muted-foreground">
		<li>Use toggle switches only for binary states that take effect immediately.</li>
		<li>Pair each switch with a clear text label indicating what it controls. The <a class="inline-flex items-center gap-1 text-primary hover:underline align-middle" href="/components/list"><img src="/logo/pictorial.png" alt="logo" class="size-4" />List</a> component provides a purpose-built slot for this pattern.</li>
		<li>Position the switch toggle to the right side of list rows or text labels.</li>
		<li>
			Disable input actions programmatically when required parent fields are empty. For irreversible actions, show a <a class="inline-flex items-center gap-1 text-primary hover:underline align-middle" href="/components/dialog"><img src="/logo/pictorial.png" alt="logo" class="size-4" />Dialog</a> confirmation instead.
		</li>
	</ul>
</div>

<div class="flex flex-col gap-6 w-full p-12">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Props</h1>
		<p class="text-md text-muted-foreground">The props available for the Switch component.</p>
	</div>
	<div class="w-full overflow-x-auto border rounded-md bg-card">
		<table class="w-full text-sm text-left">
			<thead>
				<tr class="border-b">
					<th class="p-4 font-semibold text-foreground">Prop</th>
					<th class="p-4 font-semibold text-foreground">Type</th>
					<th class="p-4 font-semibold text-foreground">Default</th>
					<th class="p-4 font-semibold text-foreground">Description</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-border">
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">checked</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">false</td>
					<td class="p-4 text-muted-foreground">Two-way bindable state property indicating toggled state.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">disabled</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">false</td>
					<td class="p-4 text-muted-foreground">Disables clicks and pointer listeners while opacity-scaling down.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">liquidGlass</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">false</td>
					<td class="p-4 text-muted-foreground">Enables physical liquid glass refraction (Chromium only).</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">refractiveIndex</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">number</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">1.5</td>
					<td class="p-4 text-muted-foreground">IOR of glass curvature. Range 1.0 (air) to 2.4.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">bezelWidth</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">number</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">10</td>
					<td class="p-4 text-muted-foreground">Depth of bezel refraction zone (px).</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">displacementScale</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">number</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">15</td>
					<td class="p-4 text-muted-foreground">Intensity of physical refraction offset.</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
