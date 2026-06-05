<script lang="ts">
	import * as NavigationStack from "$lib/components/navigationStack";
	import * as ButtonGroup from "$lib/components/ui/button-group";
	import { Button } from "$lib/components/ui/button";
	import { Switch } from "$lib/components/ui/switch";
	import * as Select from "$lib/components/ui/select";
	import CodeBlock from "$lib/components/codeblock.svelte";
	import { ChevronLeft, Info, Calendar } from "@lucide/svelte";

	// Button Group state
	let variant = $state<"prominent" | "bordered" | "secondary" | "translucent" | "ghost" | "destructive">("translucent");
	let size = $state<"default" | "xs" | "sm" | "lg">("default");
	let specular = $state(true);
	let magnetic = $state(true);
	let scale = $state(true);

	let activeSegment = $state("week");

	const variants = [
		{ value: "prominent", label: "Prominent (Solid)" },
		{ value: "bordered", label: "Bordered (Outline)" },
		{ value: "secondary", label: "Secondary" },
		{ value: "translucent", label: "Translucent (Glass)" },
		{ value: "ghost", label: "Ghost" },
		{ value: "destructive", label: "Destructive" },
	];

	const sizes = [
		{ value: "xs", label: "Extra Small (xs)" },
		{ value: "sm", label: "Small (sm)" },
		{ value: "default", label: "Default (default)" },
		{ value: "lg", label: "Large (lg)" },
	];

	let activeVariantLabel = $derived(variants.find((v) => v.value === variant)?.label ?? "Select a variant");
	let activeSizeLabel = $derived(sizes.find((s) => s.value === size)?.label ?? "Select a size");

	// Generated Code
	let generatedCode = $derived.by(() => {
		const props = [];
		if (variant !== "translucent") props.push(`variant="${variant}"`);
		if (size !== "default") props.push(`size="${size}"`);
		if (!specular) props.push(`specular={false}`);
		if (!magnetic) props.push(`magnetic={false}`);
		if (!scale) props.push(`scale={false}`);

		const propsStr = props.length > 0 ? " " + props.join(" ") : "";
		return `<script lang="ts">
	import * as ButtonGroup from "$lib/components/ui/button-group";
	import { Button } from "$lib/components/ui/button";
	let activeSegment = $state("week");
</${"script"}>

<ButtonGroup.Root${propsStr}>
	<Button onclick={() => activeSegment = "year"} class={activeSegment === "year" ? "bg-foreground/10" : ""}>Year</Button>
	<Button onclick={() => activeSegment = "month"} class={activeSegment === "month" ? "bg-foreground/10" : ""}>Month</Button>
	<Button onclick={() => activeSegment = "week"} class={activeSegment === "week" ? "bg-foreground/10" : ""}>Week</Button>
</ButtonGroup.Root>`;
	});
</script>

<NavigationStack.Root>
	<NavigationStack.Header title="Button Group">
		{#snippet leading()}
			<Button variant="translucent" size="icon" href="/components">
				<ChevronLeft class="size-4" />
			</Button>
		{/snippet}
	</NavigationStack.Header>

	<div class="flex flex-col gap-20 px-6 py-12 w-full max-w-4xl">
		<div class="flex flex-col gap-2">
			<NavigationStack.LargeTitle>Button Group</NavigationStack.LargeTitle>
			<p class="text-md text-muted-foreground max-w-2xl">
				Combines multiple nested Buttons together into a single fluid Segmented Bar. The root capsule acts as a unified magnetic drag frame and specular gloss glare boundary.
			</p>
		</div>

		<div class="flex flex-col gap-3">
			<span class="text-sm font-semibold text-muted-foreground ml-1">Preview</span>
			<div class="h-64 w-full flex items-center justify-center bg-[url(/bg_rotating.gif)] bg-cover rounded-3xl relative shadow-md overflow-hidden group">
				<div class="relative z-10 flex flex-col items-center gap-4">
					<ButtonGroup.Root {variant} {size} {specular} {magnetic} {scale} liquidGlass={true} class="shadow-2xl border border-white/10">
						<Button onclick={() => (activeSegment = "year")} class={activeSegment === "year" ? "bg-foreground/15 dark:bg-foreground/10 font-bold" : ""}>Year</Button>
						<Button onclick={() => (activeSegment = "month")} class={activeSegment === "month" ? "bg-foreground/15 dark:bg-foreground/10 font-bold" : ""}>Month</Button>
						<Button onclick={() => (activeSegment = "week")} class={activeSegment === "week" ? "bg-foreground/15 dark:bg-foreground/10 font-bold" : ""}>Week</Button>
						<Button onclick={() => (activeSegment = "day")} class={activeSegment === "day" ? "bg-foreground/15 dark:bg-foreground/10 font-bold" : ""}>Day</Button>
					</ButtonGroup.Root>

					<div class="text-xs text-foreground font-semibold bg-background/50 backdrop-blur border border-white/10 px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 mt-2">
						<Calendar class="size-3.5 text-primary" /> Active Interval: <span class="font-bold text-primary">{activeSegment}</span>
					</div>
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-8 mt-4 w-full">
			<div class="flex flex-col gap-6">
				<span class="text-sm font-semibold text-muted-foreground ml-1">Configuration</span>

				<div class="flex flex-col gap-2">
					<label class="text-xs font-semibold text-muted-foreground">Capsule Variant</label>
					<Select.Root value={variant} type="single" onValueChange={(val) => (variant = val as any)}>
						<Select.Trigger class="w-full">
							{activeVariantLabel}
						</Select.Trigger>
						<Select.Content>
							{#each variants as item}
								<Select.Item value={item.value} label={item.label} />
							{/each}
						</Select.Content>
					</Select.Root>
				</div>

				<div class="flex flex-col gap-2">
					<label class="text-xs font-semibold text-muted-foreground">Capsule Size</label>
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
							<span class="text-sm font-medium">Magnetic Cursor Pull</span>
							<span class="text-xs text-muted-foreground">Pulls entire capsule towards pointer gravity</span>
						</div>
						<Switch bind:checked={magnetic} />
					</div>

					<div class="flex flex-row justify-between items-center">
						<div class="flex flex-col gap-0.5">
							<span class="text-sm font-medium">Haptic Press Scale</span>
							<span class="text-xs text-muted-foreground">Squeezes segmented capsule on active clicks</span>
						</div>
						<Switch bind:checked={scale} />
					</div>

					<div class="flex flex-row justify-between items-center">
						<div class="flex flex-col gap-0.5">
							<span class="text-sm font-medium">Specular Highlight Glare</span>
							<span class="text-xs text-muted-foreground">Rotates shiny border glare overlays</span>
						</div>
						<Switch bind:checked={specular} />
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-3">
				<span class="text-sm font-semibold text-muted-foreground ml-1">Installation</span>
				<CodeBlock code="npx shadcn-svelte@latest add https://ui.grgurevic.click/r/button-group.json" lang="bash" />
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
							<td class="p-4 font-mono font-bold text-primary">variant</td>
							<td class="p-4 font-mono text-xs">"prominent" | "bordered" | "secondary" | "translucent" | "ghost" | "destructive"</td>
							<td class="p-4 font-mono text-xs">"translucent"</td>
							<td class="p-4 text-muted-foreground">Capsule backdrop/outline styling.</td>
						</tr>
						<tr>
							<td class="p-4 font-mono font-bold text-primary">size</td>
							<td class="p-4 font-mono text-xs">"xs" | "sm" | "default" | "lg"</td>
							<td class="p-4 font-mono text-xs">"default"</td>
							<td class="p-4 text-muted-foreground">Tuning heights and internal child spacing gaps.</td>
						</tr>
						<tr>
							<td class="p-4 font-mono font-bold text-primary">magnetic</td>
							<td class="p-4 font-mono text-xs">boolean</td>
							<td class="p-4 font-mono text-xs">true</td>
							<td class="p-4 text-muted-foreground">Activates spring drag gravity forces on pointer.</td>
						</tr>
						<tr>
							<td class="p-4 font-mono font-bold text-primary">scale</td>
							<td class="p-4 font-mono text-xs">boolean</td>
							<td class="p-4 font-mono text-xs">true</td>
							<td class="p-4 text-muted-foreground">Allows elastic container compression on mouse presses.</td>
						</tr>
						<tr>
							<td class="p-4 font-mono font-bold text-primary">specular</td>
							<td class="p-4 font-mono text-xs">boolean</td>
							<td class="p-4 font-mono text-xs">true</td>
							<td class="p-4 text-muted-foreground">Appends dynamic 3D glossy highlight glare lines.</td>
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
							<td class="p-4 font-mono text-xs">20</td>
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
