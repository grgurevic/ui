<script lang="ts">
	import CodeAccordion from "$lib/components/code-accordion.svelte";
	import Codeblock from "$lib/components/codeblock.svelte";
	import { Input } from "$lib/components/ui/input";
	import { Sparkles } from "@lucide/svelte";

	let basicValue = $state("");
	let clearableValue = $state("Grgurevic UI");
	let disabledValue = $state("Cannot edit this");
</script>

<div class="flex flex-col gap-4 w-full p-12 border-b">
	<h1 class="text-4xl font-semibold">Input</h1>
	<p class="text-lg text-muted-foreground">A highly custom text input component featuring native-feeling iOS clear-text triggers, focus ring shadows, and specular boundary glares.</p>
	<Codeblock code="bunx shadcn-svelte@latest add https://ui.grgurevic.click/r/input.json" lang="bash" classes="rounded-md border" />
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Basic Input</h1>
		<p class="text-md text-muted-foreground">A simple text input with custom placeholder.</p>
	</div>
	<CodeAccordion
		code={`<${"script"} lang="ts">
	import { Input } from "$lib/components/ui/input";
	let value = $state("");
</${"script"}>

<Input bind:value placeholder="Enter username..." />`}
	>
		<div class="w-full flex justify-center py-6">
			<div class="w-full max-w-xs flex flex-col gap-2">
				<Input bind:value={basicValue} placeholder="Enter username..." />
				{#if basicValue}
					<span class="text-xs text-muted-foreground">Value: <span class="text-foreground font-mono">{basicValue}</span></span>
				{/if}
			</div>
		</div>
	</CodeAccordion>
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Interactive Features</h1>
		<p class="text-md text-muted-foreground">Clearable actions and disabled fields.</p>
	</div>
	<CodeAccordion
		code={`<${"script"} lang="ts">
	import { Input } from "$lib/components/ui/input";
	let clearableValue = $state("Grgurevic UI");
	let disabledValue = $state("Cannot edit this");
</${"script"}>

<!-- Clearable input -->
<Input bind:value={clearableValue} clearButton={true} placeholder="Search components..." />

<!-- Disabled input -->
<Input bind:value={disabledValue} disabled={true} />`}
	>
		<div class="w-full flex flex-col items-center gap-4 py-6">
			<div class="w-full max-w-xs flex flex-col gap-1.5">
				<span class="text-xs font-semibold text-muted-foreground">Clearable Field</span>
				<Input bind:value={clearableValue} clearButton={true} placeholder="Search components..." />
			</div>
			<div class="w-full max-w-xs flex flex-col gap-1.5">
				<span class="text-xs font-semibold text-muted-foreground">Disabled Field</span>
				<Input bind:value={disabledValue} disabled={true} />
			</div>
		</div>
	</CodeAccordion>
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Best practices</h1>
		<p class="text-md text-muted-foreground">The best practices when using input fields.</p>
	</div>
	<ul class="list-disc pl-5 flex flex-col gap-4 text-muted-foreground">
		<li>Keep placeholders concise and contextually relevant.</li>
		<li>
			For search fields or inputs that need an icon or action button, wrap them in an <a class="inline-flex items-center gap-1 text-primary hover:underline align-middle" href="/components/input-group"><img src="/logo/pictorial.png" alt="logo" class="size-4" />Input Group</a> instead of using a plain Input.
		</li>
		<li>Associate labels with inputs to ensure screen readers can read them properly.</li>
		<li>Disable input fields during submission states to prevent duplicate payloads.</li>
	</ul>
</div>

<div class="flex flex-col gap-6 w-full p-12">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Props</h1>
		<p class="text-md text-muted-foreground">The props available for the Input component.</p>
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
					<td class="p-4 font-mono font-bold text-foreground">value</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">string | number</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">""</td>
					<td class="p-4 text-muted-foreground">Two-way bindable active value representing the textual input.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">clearButton</td>
					<td class="p-4 font-mono text-xs">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">false</td>
					<td class="p-4 text-muted-foreground">Appends a dynamic trailing clear button matching native iOS input behavior.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">specular</td>
					<td class="p-4 font-mono text-xs">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">true</td>
					<td class="p-4 text-muted-foreground">Projects dynamic light border reflection overlay on mouse hover events.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">magnetic</td>
					<td class="p-4 font-mono text-xs">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">true</td>
					<td class="p-4 text-muted-foreground">Slightly attracts field container towards cursor position during drag motions.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">ripple</td>
					<td class="p-4 font-mono text-xs">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">true</td>
					<td class="p-4 text-muted-foreground">Enables high-fidelity ambient click ripples.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">liquidGlass</td>
					<td class="p-4 font-mono text-xs">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">false</td>
					<td class="p-4 text-muted-foreground">Enables physical liquid glass refraction (Chromium only).</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">refractiveIndex</td>
					<td class="p-4 font-mono text-xs">number</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">1.5</td>
					<td class="p-4 text-muted-foreground">IOR of glass curvature. Range 1.0 (air) to 2.4.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">bezelWidth</td>
					<td class="p-4 font-mono text-xs">number</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">20</td>
					<td class="p-4 text-muted-foreground">Depth of bezel refraction zone (px).</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">displacementScale</td>
					<td class="p-4 font-mono text-xs">number</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">30</td>
					<td class="p-4 text-muted-foreground">Intensity of physical refraction offset.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">surfaceProfile</td>
					<td class="p-4 font-mono text-xs">"circle" | "squircle" | "concave" | "lip"</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">"squircle"</td>
					<td class="p-4 text-muted-foreground">3D bezel curvature outline profile.</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
