<script lang="ts">
	import * as NavigationStack from "$lib/components/navigationStack";
	import { Button } from "$lib/components/ui/button";
	import { Switch } from "$lib/components/ui/switch";
	import * as Select from "$lib/components/ui/select";
	import CodeBlock from "$lib/components/codeblock.svelte";
	import { ChevronLeft, Check, Sparkles, AlertTriangle } from "@lucide/svelte";

	// Playground state
	let variant = $state<"prominent" | "bordered" | "secondary" | "translucent" | "ghost" | "destructive">("prominent");
	let size = $state<"xs" | "sm" | "default" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg">("default");
	let magnetic = $state(true);
	let scale = $state(true);
	let specular = $state(true);
	let disabled = $state(false);

	const variants = [
		{ value: "prominent", label: "Prominent (Filled)" },
		{ value: "bordered", label: "Bordered (Outline)" },
		{ value: "secondary", label: "Secondary" },
		{ value: "translucent", label: "Translucent" },
		{ value: "ghost", label: "Ghost" },
		{ value: "destructive", label: "Destructive" },
	];

	const sizes = [
		{ value: "xs", label: "Extra Small (xs)" },
		{ value: "sm", label: "Small (sm)" },
		{ value: "default", label: "Default (default)" },
		{ value: "lg", label: "Large (lg)" },
		{ value: "icon", label: "Icon" },
		{ value: "icon-xs", label: "Icon Extra Small" },
		{ value: "icon-sm", label: "Icon Small" },
		{ value: "icon-lg", label: "Icon Large" },
	];

	let activeVariantLabel = $derived(variants.find((v) => v.value === variant)?.label ?? "Select a variant");
	let activeSizeLabel = $derived(sizes.find((s) => s.value === size)?.label ?? "Select a size");

	// Generated Code
	let generatedCode = $derived.by(() => {
		const props = [];
		if (variant !== "prominent") props.push(`variant="${variant}"`);
		if (size !== "default") props.push(`size="${size}"`);
		if (!magnetic) props.push(`magnetic={false}`);
		if (!scale) props.push(`scale={false}`);
		if (!specular) props.push(`specular={false}`);
		if (disabled) props.push(`disabled`);

		const propsStr = props.length > 0 ? " " + props.join(" ") : "";
		return `<script lang="ts">
	import { Button } from "$lib/components/ui/button";
</${"script"}>

<Button${propsStr}>
	${size.startsWith("icon") ? `<Sparkles class="size-4" />` : "Interactive Button"}
</Button>`;
	});
</script>

<NavigationStack.Root>
	<NavigationStack.Header title="Button">
		{#snippet leading()}
			<Button variant="translucent" size="icon" href="/components">
				<ChevronLeft class="size-4" />
			</Button>
		{/snippet}
	</NavigationStack.Header>

	<div class="flex flex-col gap-20 px-6 py-12 w-full max-w-4xl">
		<div class="flex flex-col gap-2">
			<NavigationStack.LargeTitle>Button</NavigationStack.LargeTitle>
			<p class="text-md text-muted-foreground max-w-2xl">
				The Button component implements iOS-style states with support for custom elastic physics, 3D specular light reflections, and tactile spring scaling.
			</p>
		</div>

		<div class="flex flex-col gap-3">
			<span class="text-sm font-semibold text-muted-foreground ml-1">Preview</span>
			<div
				class="h-64 w-full flex items-center justify-center bg-[url(https://www.iclarified.com/images/news/97554/465552/465552.jpg)] bg-cover rounded-3xl relative border border-border/20 shadow-md overflow-hidden group"
			>
				<div class="absolute inset-0 bg-black/10 backdrop-blur-xs"></div>
				<div class="relative z-10">
					<Button {variant} {size} {magnetic} {scale} {specular} {disabled} class="shadow-xl">
						{#if size.startsWith("icon")}
							<Sparkles class="size-5" />
						{:else}
							Interactive Button
						{/if}
					</Button>
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-8 mt-4 w-full">
			<div class="flex flex-col gap-6">
				<span class="text-sm font-semibold text-muted-foreground ml-1">Configuration</span>

				<div class="flex flex-col gap-2">
					<label class="text-xs font-semibold text-muted-foreground">Variant</label>
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
					<label class="text-xs font-semibold text-muted-foreground">Size</label>
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
							<span class="text-xs text-muted-foreground">Pulls button towards cursor elastic-wise</span>
						</div>
						<Switch bind:checked={magnetic} />
					</div>

					<div class="flex flex-row justify-between items-center">
						<div class="flex flex-col gap-0.5">
							<span class="text-sm font-medium">Haptic Elastic Scale</span>
							<span class="text-xs text-muted-foreground">Squeezes on holding and click actions</span>
						</div>
						<Switch bind:checked={scale} />
					</div>

					<div class="flex flex-row justify-between items-center">
						<div class="flex flex-col gap-0.5">
							<span class="text-sm font-medium">Specular Highlight</span>
							<span class="text-xs text-muted-foreground">Simulates light reflection angles</span>
						</div>
						<Switch bind:checked={specular} />
					</div>

					<div class="flex flex-row justify-between items-center border-t border-border/10 pt-4">
						<div class="flex flex-col gap-0.5">
							<span class="text-sm font-medium">Disabled State</span>
							<span class="text-xs text-muted-foreground">Freezes interaction handlers</span>
						</div>
						<Switch bind:checked={disabled} />
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-3">
				<span class="text-sm font-semibold text-muted-foreground ml-1">Installation</span>
				<CodeBlock code="npx shadcn-svelte@latest add https://ui.grgurevic.click/r/button.json" lang="bash" />
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
							<td class="p-4 text-muted-foreground">Visual configuration style.</td>
						</tr>
						<tr>
							<td class="p-4 font-mono font-bold text-primary">size</td>
							<td class="p-4 font-mono text-xs">"xs" | "sm" | "default" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"</td>
							<td class="p-4 font-mono text-xs">"default"</td>
							<td class="p-4 text-muted-foreground">Sizing dimensions.</td>
						</tr>
						<tr>
							<td class="p-4 font-mono font-bold text-primary">magnetic</td>
							<td class="p-4 font-mono text-xs">boolean</td>
							<td class="p-4 font-mono text-xs">true</td>
							<td class="p-4 text-muted-foreground">Enables cursor gravity elastic pulling.</td>
						</tr>
						<tr>
							<td class="p-4 font-mono font-bold text-primary">scale</td>
							<td class="p-4 font-mono text-xs">boolean</td>
							<td class="p-4 font-mono text-xs">true</td>
							<td class="p-4 text-muted-foreground">Enables 3D elastic spring compression on clicks.</td>
						</tr>
						<tr>
							<td class="p-4 font-mono font-bold text-primary">specular</td>
							<td class="p-4 font-mono text-xs">boolean</td>
							<td class="p-4 font-mono text-xs">true</td>
							<td class="p-4 text-muted-foreground">Enables dynamic light highlight reflection overlay.</td>
						</tr>
						<tr>
							<td class="p-4 font-mono font-bold text-primary">href</td>
							<td class="p-4 font-mono text-xs">string</td>
							<td class="p-4 font-mono text-xs">undefined</td>
							<td class="p-4 text-muted-foreground">Optional URL path. If provided, renders an anchor link styled like a button.</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</NavigationStack.Root>
