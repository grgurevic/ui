<script lang="ts">
	import * as NavigationStack from "$lib/components/navigationStack";
	import { GlassView } from "$lib/components/ui/glass-view";
	import { Switch } from "$lib/components/ui/switch";
	import { Slider } from "$lib/components/ui/slider";
	import * as Select from "$lib/components/ui/select";
	import { Button } from "$lib/components/ui/button";
	import CodeBlock from "$lib/components/codeblock.svelte";
	import { ChevronLeft, Info, Compass, HelpCircle, Sparkles, Layers } from "@lucide/svelte";

	// GlassView state
	let variant = $state<"prominent" | "bordered" | "secondary" | "translucent" | "ghost" | "destructive">("translucent");
	let size = $state<"xs" | "sm" | "default" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg">("default");
	let magnetic = $state(true);
	let scale = $state(true);
	let specular = $state(true);

	// Liquid Glass controls (Defaulting to true for instant showcase WOW effect!)
	let liquidGlass = $state(true);
	let refractiveIndex = $state(1.5);
	let bezelWidth = $state(24);
	let displacementScale = $state(40);
	let surfaceProfile = $state<"circle" | "squircle" | "concave" | "lip">("squircle");
	let chromaticAberration = $state(true);
	let saturationBoost = $state(1.3);
	let backgroundBlur = $state(0.3);

	const variants = [
		{ value: "prominent", label: "Prominent (Solid)" },
		{ value: "bordered", label: "Bordered" },
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

	const profiles = [
		{ value: "squircle", label: "Convex Squircle (Apple style)" },
		{ value: "circle", label: "Convex Circle" },
		{ value: "concave", label: "Concave" },
		{ value: "lip", label: "Smooth S-Curve Lip" },
	];

	let activeVariantLabel = $derived(variants.find((v) => v.value === variant)?.label ?? "Select a variant");
	let activeSizeLabel = $derived(sizes.find((s) => s.value === size)?.label ?? "Select a size");
	let activeProfileLabel = $derived(profiles.find((p) => p.value === surfaceProfile)?.label ?? "Select a profile");

	// Generated Code
	let generatedCode = $derived.by(() => {
		const props = [];
		if (variant !== "translucent") props.push(`variant="${variant}"`);
		if (size !== "default") props.push(`size="${size}"`);
		if (!magnetic) props.push(`magnetic={false}`);
		if (!scale) props.push(`scale={false}`);
		if (!specular) props.push(`specular={false}`);
		if (liquidGlass) {
			props.push(`liquidGlass={true}`);
			if (refractiveIndex !== 1.5) props.push(`refractiveIndex={${refractiveIndex}}`);
			if (bezelWidth !== 20) props.push(`bezelWidth={${bezelWidth}}`);
			if (displacementScale !== 40) props.push(`displacementScale={${displacementScale}}`);
			if (surfaceProfile !== "squircle") props.push(`surfaceProfile="${surfaceProfile}"`);
			if (chromaticAberration) props.push(`chromaticAberration={true}`);
			if (saturationBoost !== 1.3) props.push(`saturationBoost={${saturationBoost}}`);
			if (backgroundBlur !== 0.3) props.push(`backgroundBlur={${backgroundBlur}}`);
		}

		const propsStr = props.length > 0 ? "\n\t" + props.join("\n\t") : "";
		return `<script lang="ts">
	import { GlassView } from "$lib/components/ui/glass-view";
</\${"script"}>

<GlassView${propsStr}
	class="w-64 h-28 flex flex-col items-center justify-center gap-2"
>
	<Compass class="size-6 animate-spin-slow" />
	<span>Glass Container Content</span>
</GlassView>`;
	});
</script>

<svelte:head>
	<title>Liquid Glass Svelte Component - Glass View | Grgurevic UI</title>
	<meta name="description" content="A premium physics-based refractive Liquid Glass component for Svelte 5. Control refractive index, bezel width, chromatic aberration, and specular light reflections in SvelteKit." />
	<meta name="keywords" content="liquid glass svelte, svelte liquid glass component, refractive glass svelte, svelte 5 glass view, sveltekit glass filter" />
</svelte:head>

<NavigationStack.Root>
	<NavigationStack.Header title="Glass View">
		{#snippet leading()}
			<Button variant="translucent" size="icon" href="/components">
				<ChevronLeft class="size-4" />
			</Button>
		{/snippet}
	</NavigationStack.Header>

	<div class="flex flex-col gap-20 px-6 py-12 w-full max-w-4xl">
		<div class="flex flex-col gap-2">
			<NavigationStack.LargeTitle>Glass View</NavigationStack.LargeTitle>
			<p class="text-md text-muted-foreground max-w-2xl">
				The core styling primitives of Grgurevic UI. This premium <strong>liquid glass svelte component</strong> features realistic, physics-based refraction at border edges, complete with chromatic aberration, custom curvature profiles, and dynamic 3D specular glare shadows.
			</p>
		</div>

		<div class="flex flex-col gap-3">
			<span class="text-sm font-semibold text-muted-foreground ml-1">Interactive Preview</span>
			<div class="h-72 w-full flex items-center justify-center bg-[url(/bg_rotating.gif)] bg-cover rounded-3xl relative shadow-xl overflow-hidden group">
				<div class="relative z-10 flex items-center justify-center w-full h-full p-8">
					<GlassView
						{variant}
						{size}
						{magnetic}
						{scale}
						{specular}
						{liquidGlass}
						{refractiveIndex}
						{bezelWidth}
						{displacementScale}
						{surfaceProfile}
						{chromaticAberration}
						{saturationBoost}
						{backgroundBlur}
						class="w-72 h-32 flex flex-col items-center justify-center gap-2 select-none"
					>
						<Compass class="size-7 text-foreground animate-spin-slow" />
						<span class="text-sm font-semibold tracking-wide">Refractive Liquid Glass</span>
						<span class="text-3xs text-muted-foreground/80 uppercase font-bold">physics enabled</span>
					</GlassView>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4 w-full">
			<div class="flex flex-col gap-6">
				<span class="text-sm font-bold text-foreground border-b border-border/10 pb-2">Core Configuration</span>

				<div class="flex flex-col gap-2">
					<label class="text-xs font-semibold text-muted-foreground">Variant Backdrop</label>
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
					<label class="text-xs font-semibold text-muted-foreground">Internal Padding Size</label>
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
							<span class="text-xs text-muted-foreground">Pulls block towards cursor elastic-wise</span>
						</div>
						<Switch bind:checked={magnetic} />
					</div>

					<div class="flex flex-row justify-between items-center">
						<div class="flex flex-col gap-0.5">
							<span class="text-sm font-medium">Scale Feedback</span>
							<span class="text-xs text-muted-foreground">Squeezes on holding and click actions</span>
						</div>
						<Switch bind:checked={scale} />
					</div>

					<div class="flex flex-row justify-between items-center">
						<div class="flex flex-col gap-0.5">
							<span class="text-sm font-medium">Border Specular Glare</span>
							<span class="text-xs text-muted-foreground">Light reflection on high edges</span>
						</div>
						<Switch bind:checked={specular} />
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-6">
				<span class="text-sm font-bold text-foreground border-b border-border/10 pb-2">Liquid Glass Refraction</span>

				<div class="flex flex-row justify-between items-center">
					<div class="flex flex-col gap-0.5">
						<span class="text-sm font-medium">Liquid Glass Effect</span>
						<span class="text-xs text-muted-foreground text-primary font-semibold">SVG backdrop-filter (Chromium only)</span>
					</div>
					<Switch bind:checked={liquidGlass} />
				</div>

				{#if liquidGlass}
					<div class="flex flex-col gap-4 border-t border-border/20 pt-4">
						<div class="flex flex-col gap-2">
							<div class="flex justify-between text-xs font-semibold">
								<span class="text-muted-foreground">Refractive Index (IOR)</span>
								<span class="font-mono text-primary">{refractiveIndex.toFixed(2)}</span>
							</div>
							<Slider bind:value={refractiveIndex} type="single" min={1.0} max={2.4} step={0.1} />
							<span class="text-3xs text-muted-foreground">1.0 = air (none), 1.3 = water, 1.5 = glass, 2.4 = diamond.</span>
						</div>

						<div class="flex flex-col gap-2">
							<div class="flex justify-between text-xs font-semibold">
								<span class="text-muted-foreground">Bezel Refraction Width</span>
								<span class="font-mono text-primary">{bezelWidth}px</span>
							</div>
							<Slider bind:value={bezelWidth} type="single" min={5} max={60} step={1} />
						</div>

						<div class="flex flex-col gap-2">
							<div class="flex justify-between text-xs font-semibold">
								<span class="text-muted-foreground">Displacement Scale</span>
								<span class="font-mono text-primary">{displacementScale}</span>
							</div>
							<Slider bind:value={displacementScale} type="single" min={0} max={100} step={5} />
						</div>

						<div class="flex flex-col gap-2">
							<label class="text-xs font-semibold text-muted-foreground">Bezel Curvature Profile</label>
							<Select.Root value={surfaceProfile} type="single" onValueChange={(val) => (surfaceProfile = val as any)}>
								<Select.Trigger class="w-full">
									{activeProfileLabel}
								</Select.Trigger>
								<Select.Content>
									{#each profiles as item}
										<Select.Item value={item.value} label={item.label} />
									{/each}
								</Select.Content>
							</Select.Root>
						</div>

						<div class="flex flex-row justify-between items-center border-t border-border/10 pt-4">
							<div class="flex flex-col gap-0.5">
								<span class="text-sm font-medium">Chromatic Aberration</span>
								<span class="text-xs text-muted-foreground">Simulates RGB light fringing spectrums</span>
							</div>
							<Switch bind:checked={chromaticAberration} />
						</div>

						<div class="flex flex-col gap-2">
							<div class="flex justify-between text-xs font-semibold">
								<span class="text-muted-foreground">Refracted Saturation Boost</span>
								<span class="font-mono text-primary">{saturationBoost.toFixed(1)}x</span>
							</div>
							<Slider bind:value={saturationBoost} type="single" min={1.0} max={2.0} step={0.1} />
						</div>

						<div class="flex flex-col gap-2">
							<div class="flex justify-between text-xs font-semibold">
								<span class="text-muted-foreground">Backdrop Blur Softener</span>
								<span class="font-mono text-primary">{backgroundBlur.toFixed(1)}px</span>
							</div>
							<Slider bind:value={backgroundBlur} type="single" min={0} max={3.0} step={0.1} />
						</div>
					</div>
				{/if}
			</div>
		</div>

		<div class="flex flex-col gap-8 w-full">
			<div class="flex flex-col gap-3">
				<span class="text-sm font-semibold text-muted-foreground ml-1">Installation</span>
				<CodeBlock code="npx shadcn-svelte@latest add https://ui.grgurevic.click/r/glass-view.json" lang="bash" />
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
							<td class="p-4 font-mono text-xs">"prominent"</td>
							<td class="p-4 text-muted-foreground">Backdrop filter/opacity configuration.</td>
						</tr>
						<tr>
							<td class="p-4 font-mono font-bold text-primary">size</td>
							<td class="p-4 font-mono text-xs">"xs" | "sm" | "default" | "lg"</td>
							<td class="p-4 font-mono text-xs">"default"</td>
							<td class="p-4 text-muted-foreground">Paddings configuration.</td>
						</tr>
						<tr>
							<td class="p-4 font-mono font-bold text-primary">magnetic</td>
							<td class="p-4 font-mono text-xs">boolean</td>
							<td class="p-4 font-mono text-xs">true</td>
							<td class="p-4 text-muted-foreground">Pulls the card toward the pointer using spring drag parameters.</td>
						</tr>
						<tr>
							<td class="p-4 font-mono font-bold text-primary">scale</td>
							<td class="p-4 font-mono text-xs">boolean</td>
							<td class="p-4 font-mono text-xs">true</td>
							<td class="p-4 text-muted-foreground">Squeezes on holding and click actions.</td>
						</tr>
						<tr>
							<td class="p-4 font-mono font-bold text-primary">specular</td>
							<td class="p-4 font-mono text-xs">boolean</td>
							<td class="p-4 font-mono text-xs">true</td>
							<td class="p-4 text-muted-foreground">Projects precise 3D specular light glare onto borders.</td>
						</tr>
						<!-- New props documentation -->
						<tr class="bg-primary/5">
							<td class="p-4 font-mono font-bold text-primary">liquidGlass</td>
							<td class="p-4 font-mono text-xs">boolean</td>
							<td class="p-4 font-mono text-xs">false</td>
							<td class="p-4 text-muted-foreground">Enables the Apple-inspired physical glass refraction and specular overlay.</td>
						</tr>
						<tr class="bg-primary/5">
							<td class="p-4 font-mono font-bold text-primary">refractiveIndex</td>
							<td class="p-4 font-mono text-xs">number</td>
							<td class="p-4 font-mono text-xs">1.5</td>
							<td class="p-4 text-muted-foreground">The index of refraction (IOR). Simulates realistic physical bending of background light.</td>
						</tr>
						<tr class="bg-primary/5">
							<td class="p-4 font-mono font-bold text-primary">bezelWidth</td>
							<td class="p-4 font-mono text-xs">number</td>
							<td class="p-4 font-mono text-xs">20</td>
							<td class="p-4 text-muted-foreground">The width of the refraction zone around the element's border (in pixels).</td>
						</tr>
						<tr class="bg-primary/5">
							<td class="p-4 font-mono font-bold text-primary">displacementScale</td>
							<td class="p-4 font-mono text-xs">number</td>
							<td class="p-4 font-mono text-xs">40</td>
							<td class="p-4 text-muted-foreground">SVG displacement mapping strength. Controls the magnitude of pixel shift.</td>
						</tr>
						<tr class="bg-primary/5">
							<td class="p-4 font-mono font-bold text-primary">surfaceProfile</td>
							<td class="p-4 font-mono text-xs">"circle" | "squircle" | "concave" | "lip"</td>
							<td class="p-4 font-mono text-xs">"squircle"</td>
							<td class="p-4 text-muted-foreground">The height curve shape of the bezel. "squircle" matches Apple's design curvature perfectly.</td>
						</tr>
						<tr class="bg-primary/5">
							<td class="p-4 font-mono font-bold text-primary">chromaticAberration</td>
							<td class="p-4 font-mono text-xs">boolean</td>
							<td class="p-4 font-mono text-xs">false</td>
							<td class="p-4 text-muted-foreground">Enables 3-channel (RGB) parallel displacement to produce hyper-realistic rainbow fringing.</td>
						</tr>
						<tr class="bg-primary/5">
							<td class="p-4 font-mono font-bold text-primary">saturationBoost</td>
							<td class="p-4 font-mono text-xs">number</td>
							<td class="p-4 font-mono text-xs">1.3</td>
							<td class="p-4 text-muted-foreground">Amplifies color saturation inside the glass container to simulate prism color amplification.</td>
						</tr>
						<tr class="bg-primary/5">
							<td class="p-4 font-mono font-bold text-primary">backgroundBlur</td>
							<td class="p-4 font-mono text-xs">number</td>
							<td class="p-4 font-mono text-xs">0.3</td>
							<td class="p-4 text-muted-foreground">Slight pre-blur parameter to prevent hard pixels and alias edges inside the refraction.</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</NavigationStack.Root>

<style>
	:global(.animate-spin-slow) {
		animation: spin 8s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
