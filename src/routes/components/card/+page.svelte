<script lang="ts">
	import * as NavigationStack from "$lib/components/navigationStack";
	import * as Card from "$lib/components/ui/card";
	import { Switch } from "$lib/components/ui/switch";
	import * as Select from "$lib/components/ui/select";
	import { Button } from "$lib/components/ui/button";
	import CodeBlock from "$lib/components/codeblock.svelte";
	import { ChevronLeft, Info, Ellipsis, Heart, Share2 } from "@lucide/svelte";

	// Card state
	let size = $state<"default" | "sm">("default");
	let specular = $state(true);
	let magnetic = $state(true);
	let scale = $state(true);
	let ripple = $state(true);

	const sizes = [
		{ value: "default", label: "Default (default)" },
		{ value: "sm", label: "Small (sm)" },
	];

	let activeSizeLabel = $derived(sizes.find((s) => s.value === size)?.label ?? "Select a size");

	// Generated Code
	let generatedCode = $derived.by(() => {
		const props = [];
		if (size !== "default") props.push(`size="${size}"`);
		if (!specular) props.push(`specular={false}`);
		if (magnetic) props.push(`magnetic`);
		if (scale) props.push(`scale`);
		if (ripple) props.push(`ripple`);

		const propsStr = props.length > 0 ? " " + props.join(" ") : "";
		return `<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
</${"script"}>

<Card.Root${propsStr} class="w-full max-w-sm shadow-xl">
	<Card.Header>
		<Card.Title>Smart Thermostat</Card.Title>
		<Card.Description>Intelligent climate control.</Card.Description>
		<Card.Action>
			<Button variant="ghost" size="icon-xs">...</Button>
		</Card.Action>
	</Card.Header>
	<Card.Content>
		<div class="text-3xl font-bold">72°F</div>
	</Card.Content>
	<Card.Footer class="flex justify-between items-center">
		<span class="text-xs text-muted-foreground">HomeKit Active</span>
		<Button size="sm">Configure</Button>
	</Card.Footer>
</Card.Root>`;
	});
</script>

<NavigationStack.Root>
	<NavigationStack.Header title="Card">
		{#snippet leading()}
			<Button variant="translucent" size="icon" href="/components">
				<ChevronLeft class="size-4" />
			</Button>
		{/snippet}
	</NavigationStack.Header>

	<div class="flex flex-col gap-20 px-6 py-12 w-full max-w-4xl">
		<div class="flex flex-col gap-2">
			<NavigationStack.LargeTitle>Card</NavigationStack.LargeTitle>
			<p class="text-md text-muted-foreground max-w-2xl">
				A highly custom structure panel comprising headers, descriptors, dynamic actions, content boundaries, and custom footers. Implements physical magnetic pulls, click ripples, and boundary
				reflections.
			</p>
		</div>

		<div class="flex flex-col gap-3">
			<span class="text-sm font-semibold text-muted-foreground ml-1">Preview</span>
			<div class="py-12 px-6 w-full flex items-center justify-center bg-[url(/bg_rotating.gif)] bg-cover rounded-3xl relative shadow-md overflow-hidden group">
				<Card.Root {size} {specular} {magnetic} {scale} {ripple} liquidGlass={true} class="w-full max-w-sm bg-card/60 backdrop-blur-md border border-white/10 shadow-2xl relative z-10 select-none">
					<Card.Header>
						<Card.Title>Smart Thermostat</Card.Title>
						<Card.Description>Intelligent climate control with scheduling and presets.</Card.Description>
						<Card.Action>
							<Button variant="ghost" size="icon-sm" onclick={() => alert("Action triggered")}><Ellipsis class="size-4" /></Button>
						</Card.Action>
					</Card.Header>
					<Card.Content>
						<div class="flex flex-col gap-3">
							<div class="flex items-center justify-between px-4">
								<div class="flex flex-col gap-0.5">
									<span class="text-xs text-muted-foreground font-medium">Current Temp</span>
									<span class="text-3xl font-semibold text-foreground">72°F</span>
								</div>
								<div class="flex flex-col gap-0.5 items-end">
									<span class="text-xs text-muted-foreground font-medium">Target Temp</span>
									<span class="text-3xl font-semibold text-primary">70°F</span>
								</div>
							</div>
						</div>
					</Card.Content>
					<Card.Footer class="flex justify-end">
						<div class="flex items-center gap-1.5">
							<Button variant="translucent" size="icon"><Heart class="size-3.5" /></Button>
							<Button variant="prominent">Configure</Button>
						</div>
					</Card.Footer>
				</Card.Root>
			</div>
		</div>

		<div class="flex flex-col gap-8 mt-4 w-full">
			<div class="flex flex-col gap-6">
				<span class="text-sm font-semibold text-muted-foreground ml-1">Configuration</span>

				<div class="flex flex-col gap-2">
					<label class="text-xs font-semibold text-muted-foreground">Card Size</label>
					<Select.Root value={size} type="single" onValueChange={(val) => (size = val as any)}>
						<Select.Trigger class="w-full">
							{activeSizeLabel}
						</Select.Trigger>
						<Select.Content>
							{#each sizes as item}
								<Select.Item value={item.value} label={item.label} />
							{/each}
						</Select.Content>
					</Select.Root>
				</div>

				<div class="flex flex-col gap-4 border-t border-border/20 pt-4">
					<div class="flex flex-row justify-between items-center">
						<div class="flex flex-col gap-0.5">
							<span class="text-sm font-medium">Magnetic Physics</span>
							<span class="text-xs text-muted-foreground">Pulls card toward mouse pointer</span>
						</div>
						<Switch bind:checked={magnetic} />
					</div>

					<div class="flex flex-row justify-between items-center">
						<div class="flex flex-col gap-0.5">
							<span class="text-sm font-medium">Haptic Press Scaling</span>
							<span class="text-xs text-muted-foreground">Press down to squeeze card dimensions</span>
						</div>
						<Switch bind:checked={scale} />
					</div>

					<div class="flex flex-row justify-between items-center">
						<div class="flex flex-col gap-0.5">
							<span class="text-sm font-medium">Interactive Ripples</span>
							<span class="text-xs text-muted-foreground">Spawns light waves on mouse clicks</span>
						</div>
						<Switch bind:checked={ripple} />
					</div>

					<div class="flex flex-row justify-between items-center border-t border-border/10 pt-4">
						<div class="flex flex-col gap-0.5">
							<span class="text-sm font-medium">Specular Glare Highlight</span>
							<span class="text-xs text-muted-foreground">Aligns shiny reflection bounds</span>
						</div>
						<Switch bind:checked={specular} />
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-3">
				<span class="text-sm font-semibold text-muted-foreground ml-1">Installation</span>
				<CodeBlock code="npx shadcn-svelte@latest add https://ui.grgurevic.click/r/card.json" lang="bash" />
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
							<td class="p-4 font-mono font-bold text-primary">size</td>
							<td class="p-4 font-mono text-xs">"default" | "sm"</td>
							<td class="p-4 font-mono text-xs">"default"</td>
							<td class="p-4 text-muted-foreground">Sets spacing/padding. `sm` uses tighter gap configurations.</td>
						</tr>
						<tr>
							<td class="p-4 font-mono font-bold text-primary">specular</td>
							<td class="p-4 font-mono text-xs">boolean</td>
							<td class="p-4 font-mono text-xs">true</td>
							<td class="p-4 text-muted-foreground">Shows specular reflective glossy light borders.</td>
						</tr>
						<tr>
							<td class="p-4 font-mono font-bold text-primary">magnetic</td>
							<td class="p-4 font-mono text-xs">boolean</td>
							<td class="p-4 font-mono text-xs">false</td>
							<td class="p-4 text-muted-foreground">Enables drag attraction forces pulling container center towards cursor.</td>
						</tr>
						<tr>
							<td class="p-4 font-mono font-bold text-primary">scale</td>
							<td class="p-4 font-mono text-xs">boolean</td>
							<td class="p-4 font-mono text-xs">false</td>
							<td class="p-4 text-muted-foreground">Enables elastic shrink/stretch on hover and presses.</td>
						</tr>
						<tr>
							<td class="p-4 font-mono font-bold text-primary">ripple</td>
							<td class="p-4 font-mono text-xs">boolean</td>
							<td class="p-4 font-mono text-xs">false</td>
							<td class="p-4 text-muted-foreground">Enables high-fidelity ambient light ripples on surface clicks.</td>
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
							<td class="p-4 font-mono text-xs">30</td>
							<td class="p-4 text-muted-foreground">Depth of bezel refraction zone (px).</td>
						</tr>
						<tr class="bg-primary/5">
							<td class="p-4 font-mono font-bold text-primary">displacementScale</td>
							<td class="p-4 font-mono text-xs">number</td>
							<td class="p-4 font-mono text-xs">40</td>
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
