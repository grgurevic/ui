<script lang="ts">
	import CodeAccordion from "$lib/components/code-accordion.svelte";
	import Codeblock from "$lib/components/codeblock.svelte";
	import { Slider } from "$lib/components/ui/slider";
	import { Button } from "$lib/components/ui/button";
	import { Sparkles } from "@lucide/svelte";

	let valueHorizontal = $state(45);
	let valueVertical = $state(60);
	let min = $state(0);
	let max = $state(100);
</script>

<div class="flex flex-col gap-4 w-full p-12 border-b">
	<h1 class="text-4xl font-semibold">Slider</h1>
	<p class="text-lg text-muted-foreground">An elegant range input featuring physical motion, jelly-like wobbles, and elastic animations.</p>
	<Codeblock code="bunx shadcn-svelte@latest add https://ui.grgurevic.click/r/slider.json" lang="bash" classes="rounded-md border" />
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Usage</h1>
		<p class="text-md text-muted-foreground">Horizontal and vertical orientation layout presets.</p>
	</div>
	<CodeAccordion
		code={`<${"script"} lang="ts">
	import { Slider } from "$lib/components/ui/slider";
	let valueHorizontal = $state(45);
	let valueVertical = $state(60);
</${"script"}>

<!-- Horizontal Slider -->
<Slider bind:value={valueHorizontal} type="single" min={0} max={100} />

<!-- Vertical Slider -->
<Slider bind:value={valueVertical} type="single" min={0} max={100} orientation="vertical" />`}
	>
		<div class="py-8 w-full flex flex-col md:flex-row items-center justify-center gap-12 select-none">
			<div class="flex-1 flex flex-col items-center justify-center gap-6 w-full max-w-sm">
				<div class="w-full flex flex-col gap-2">
					<span>{valueHorizontal}%</span>
					<Slider bind:value={valueHorizontal} type="single" {min} {max} />
				</div>
			</div>

			<div class="flex flex-col items-center justify-center gap-4 h-48 shrink-0">
				<Slider bind:value={valueVertical} type="single" {min} {max} orientation="vertical" />
				<span>{valueVertical}%</span>
			</div>
		</div>
	</CodeAccordion>
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Best practices</h1>
		<p class="text-md text-muted-foreground">The best practices when using range sliders.</p>
	</div>
	<ul class="list-disc pl-5 flex flex-col gap-4 text-muted-foreground">
		<li>
			Add numeric labels next to sliders to display the active value. For precision entry, pair with an <a class="inline-flex items-center gap-1 text-primary hover:underline align-middle" href="/components/input"><img src="/logo/pictorial.png" alt="logo" class="size-4" />Input</a> field that syncs to the same state.
		</li>
		<li>Set logical min and max limits that fit the input domain context.</li>
		<li>Enable the vertical orientation only when horizontal space is constrained.</li>
		<li>Avoid nesting multiple sliders too closely to prevent accidental dual drags.</li>
	</ul>
</div>

<div class="flex flex-col gap-6 w-full p-12">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Props</h1>
		<p class="text-md text-muted-foreground">The props available for the Slider component.</p>
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
					<td class="p-4 font-mono text-xs text-muted-foreground">number | number[]</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">0</td>
					<td class="p-4 text-muted-foreground">Two-way bindable active value representing the track percentage.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">orientation</td>
					<td class="p-4 font-mono text-xs">"horizontal" | "vertical"</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">"horizontal"</td>
					<td class="p-4 text-muted-foreground">Aligns track layout and slide dragging boundaries.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">min</td>
					<td class="p-4 font-mono text-xs">number</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">0</td>
					<td class="p-4 text-muted-foreground">Minimum boundary threshold.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">max</td>
					<td class="p-4 font-mono text-xs">number</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">100</td>
					<td class="p-4 text-muted-foreground">Maximum boundary threshold.</td>
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
					<td class="p-4 font-mono text-xs text-muted-foreground">8</td>
					<td class="p-4 text-muted-foreground">Depth of bezel refraction zone (px).</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">displacementScale</td>
					<td class="p-4 font-mono text-xs">number</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">25</td>
					<td class="p-4 text-muted-foreground">Intensity of physical refraction offset.</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
