<script lang="ts">
	import * as NavigationStack from "$lib/components/navigationStack";
	import { Slider } from "$lib/components/ui/slider";
	import CodeBlock from "$lib/components/codeblock.svelte";
	import { Button } from "$lib/components/ui/button";
	import { ChevronLeft, Info, HelpCircle } from "@lucide/svelte";

	// Slider states
	let valueHorizontal = $state(45);
	let valueVertical = $state(60);
	let min = $state(0);
	let max = $state(100);

	// Generated Code
	let generatedCode = $derived.by(() => {
		const props = [`bind:value={value}`];
		if (min !== 0) props.push(`min={${min}}`);
		if (max !== 100) props.push(`max={${max}}`);

		const propsStr = props.join(" ");
		return `<script lang="ts">
	let value = $state(45);
	import { Slider } from "$lib/components/ui/slider";
</${"script"}>

<Slider ${propsStr} />`;
	});
</script>

<NavigationStack.Root>
	<NavigationStack.Header title="Slider">
		{#snippet leading()}
			<Button variant="translucent" size="icon" href="/components">
				<ChevronLeft class="size-4" />
			</Button>
		{/snippet}
	</NavigationStack.Header>

	<div class="flex flex-col gap-20 px-6 py-12 w-full max-w-4xl">
		<div class="flex flex-col gap-2">
			<NavigationStack.LargeTitle>Slider</NavigationStack.LargeTitle>
			<p class="text-md text-muted-foreground max-w-2xl">
				An elegant range input featuring physical motion feedback. Sliders squeeze and stretch dynamically in proportion to mouse velocity and wobble with organic jelly-inertia when colliding with
				boundaries.
			</p>
		</div>

		<div class="flex flex-col gap-3">
			<span class="text-sm font-semibold text-muted-foreground ml-1">Preview</span>
			<div
				class="py-12 px-6 md:px-12 w-full flex flex-col md:flex-row items-center justify-center bg-[url(/bg_rotating.gif)] bg-cover rounded-3xl relative shadow-md overflow-hidden group gap-12 select-none"
			>
				<div class="relative z-10 flex-1 flex flex-col items-center justify-center gap-6 w-full max-w-sm">
					<div class="w-full flex flex-col gap-2">
						<div class="flex justify-between items-center text-xs font-semibold text-muted-foreground bg-background/50 backdrop-blur border border-white/10 px-3 py-1 rounded-full shadow-sm">
							<span>Horizontal Range</span>
							<span class="text-primary font-bold">{valueHorizontal}%</span>
						</div>
						<Slider bind:value={valueHorizontal} type="single" {min} {max} />
					</div>
				</div>

				<div class="relative z-10 flex flex-col items-center justify-center gap-4 h-48 shrink-0">
					<div class="text-xs font-semibold text-muted-foreground bg-background/50 backdrop-blur border border-white/10 px-3 py-1 rounded-full shadow-sm">Vertical Range</div>
					<Slider bind:value={valueVertical} type="single" {min} {max} orientation="vertical" />
					<span class="text-primary text-xs font-bold bg-background/50 backdrop-blur border border-white/10 px-3 py-1 rounded-full shadow-sm">{valueVertical}%</span>
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-8 mt-4 w-full">
			<div class="flex flex-col gap-6">
				<span class="text-sm font-semibold text-muted-foreground ml-1">Configuration</span>

				<div class="flex flex-col gap-2">
					<div class="flex justify-between items-center">
						<span class="text-xs font-semibold text-muted-foreground">Minimum value ({min})</span>
					</div>
					<Slider bind:value={min} type="single" min={-200} max={0} />
				</div>

				<div class="flex flex-col gap-2">
					<div class="flex justify-between items-center">
						<span class="text-xs font-semibold text-muted-foreground">Maximum value ({max})</span>
					</div>
					<Slider bind:value={max} type="single" min={0} max={200} />
				</div>

				<div class="flex flex-row justify-between items-center border-t border-border/20 pt-4">
					<div class="flex flex-col gap-0.5">
						<span class="text-sm font-medium">Reset Bounds</span>
						<span class="text-xs text-muted-foreground">Revert back to 0-100 defaults</span>
					</div>
					<Button
						size="sm"
						variant="bordered"
						onclick={() => {
							min = 0;
							max = 100;
						}}>Reset</Button
					>
				</div>
			</div>

			<div class="flex flex-col gap-3">
				<span class="text-sm font-semibold text-muted-foreground ml-1">Installation</span>
				<CodeBlock code="npx shadcn-svelte@latest add https://ui.grgurevic.click/r/slider.json" lang="bash" />
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
							<td class="p-4 font-mono font-bold text-primary">value</td>
							<td class="p-4 font-mono text-xs">number | number[]</td>
							<td class="p-4 font-mono text-xs">0</td>
							<td class="p-4 text-muted-foreground">Two-way bindable active value representing the track percentage.</td>
						</tr>
						<tr>
							<td class="p-4 font-mono font-bold text-primary">orientation</td>
							<td class="p-4 font-mono text-xs">"horizontal" | "vertical"</td>
							<td class="p-4 font-mono text-xs">"horizontal"</td>
							<td class="p-4 text-muted-foreground">Aligns track layout and slide dragging boundaries.</td>
						</tr>
						<tr>
							<td class="p-4 font-mono font-bold text-primary">min</td>
							<td class="p-4 font-mono text-xs">number</td>
							<td class="p-4 font-mono text-xs">0</td>
							<td class="p-4 text-muted-foreground">Minimum boundary threshold.</td>
						</tr>
						<tr>
							<td class="p-4 font-mono font-bold text-primary">max</td>
							<td class="p-4 font-mono text-xs">number</td>
							<td class="p-4 font-mono text-xs">100</td>
							<td class="p-4 text-muted-foreground">Maximum boundary threshold.</td>
						</tr>
						<tr class="bg-primary/5">
							<td class="p-4 font-mono font-bold text-primary">liquidGlass</td>
							<td class="p-4 font-mono text-xs">boolean</td>
							<td class="p-4 font-mono text-xs">false</td>
							<td class="p-4 text-muted-foreground">Enables physical liquid glass refraction (Chromium only).</td>
						</tr>
						<tr class="bg-primary/5">
							<td class="p-4 font-mono font-bold text-primary">refractiveIndex</td>
							<td class="p-4 font-mono text-xs">number</td>
							<td class="p-4 font-mono text-xs">1.5</td>
							<td class="p-4 text-muted-foreground">IOR of glass curvature. Range 1.0 (air) to 2.4.</td>
						</tr>
						<tr class="bg-primary/5">
							<td class="p-4 font-mono font-bold text-primary">bezelWidth</td>
							<td class="p-4 font-mono text-xs">number</td>
							<td class="p-4 font-mono text-xs">8</td>
							<td class="p-4 text-muted-foreground">Depth of bezel refraction zone (px).</td>
						</tr>
						<tr class="bg-primary/5">
							<td class="p-4 font-mono font-bold text-primary">displacementScale</td>
							<td class="p-4 font-mono text-xs">number</td>
							<td class="p-4 font-mono text-xs">25</td>
							<td class="p-4 text-muted-foreground">Intensity of physical refraction offset.</td>
						</tr>
						<tr class="bg-primary/5">
							<td class="p-4 font-mono font-bold text-primary">surfaceProfile</td>
							<td class="p-4 font-mono text-xs">"circle" | "squircle" | "concave" | "lip"</td>
							<td class="p-4 font-mono text-xs">"squircle"</td>
							<td class="p-4 text-muted-foreground">3D bezel curvature outline profile.</td>
						</tr>
						<tr class="bg-primary/5">
							<td class="p-4 font-mono font-bold text-primary">chromaticAberration</td>
							<td class="p-4 font-mono text-xs">boolean</td>
							<td class="p-4 font-mono text-xs">false</td>
							<td class="p-4 text-muted-foreground">Enables realistic RGB channel prism splitting.</td>
						</tr>
						<tr class="bg-primary/5">
							<td class="p-4 font-mono font-bold text-primary">saturationBoost</td>
							<td class="p-4 font-mono text-xs">number</td>
							<td class="p-4 font-mono text-xs">1.3</td>
							<td class="p-4 text-muted-foreground">Color saturation boost multiplier inside refracted zone.</td>
						</tr>
						<tr class="bg-primary/5">
							<td class="p-4 font-mono font-bold text-primary">backgroundBlur</td>
							<td class="p-4 font-mono text-xs">number</td>
							<td class="p-4 font-mono text-xs">0.3</td>
							<td class="p-4 text-muted-foreground">Slight pre-blur factor to hide SVG pixelation artifacts.</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</NavigationStack.Root>
