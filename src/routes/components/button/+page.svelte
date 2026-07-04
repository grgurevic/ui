<script lang="ts">
	import CodeAccordion from "$lib/components/code-accordion.svelte";
	import Codeblock from "$lib/components/codeblock.svelte";
	import { Button } from "$lib/components/ui/button";
	import { ArrowDown, Plus, Save, Search, Sparkles, Trash, X } from "@lucide/svelte";
</script>

<div class="flex flex-col gap-4 w-full p-12 border-b">
	<h1 class="text-4xl font-semibold">Button</h1>
	<p class="text-lg text-muted-foreground">Used to trigger an action, such as opening a dialog or submitting a form.</p>
	<Codeblock code="bunx shadcn-svelte@latest add https://ui.grgurevic.click/r/button.json" lang="bash" classes="rounded-md border" />
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Sizes</h1>
		<p class="text-md text-muted-foreground">The default size is medium.</p>
	</div>
	<CodeAccordion
		code={`<${"script"} lang="ts">
	import { Button } from "$lib/components/ui/button";
</${"script"}>

<div class="flex flex-row gap-4">
	<Button size="xs">Extra Small</Button>
	<Button size="sm">Small</Button>
	<Button>Default</Button>
	<Button size="lg">Large</Button>
</div>
<div class="flex flex-row gap-4">
	<Button size="icon-sm"><Sparkles /></Button>
	<Button size="icon"><Sparkles /></Button>
	<Button size="icon-lg"><Sparkles /></Button>
</div>`}
	>
		<div class="flex flex-row gap-4">
			<Button size="xs">Extra Small</Button>
			<Button size="sm">Small</Button>
			<Button>Default</Button>
			<Button size="lg">Large</Button>
		</div>
		<div class="flex flex-row gap-4">
			<Button size="icon-sm"><Sparkles /></Button>
			<Button size="icon"><Sparkles /></Button>
			<Button size="icon-lg"><Sparkles /></Button>
		</div>
	</CodeAccordion>
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Variants</h1>
		<p class="text-md text-muted-foreground">The default variant is prominent.</p>
	</div>
	<CodeAccordion
		code={`<${"script"} lang="ts">
	import { Button } from "$lib/components/ui/button";
</${"script"}>

<div class="flex flex-row gap-4">
	<Button variant="prominent">Prominent</Button>
	<Button variant="bordered">Bordered</Button>
	<Button variant="secondary">Secondary</Button>
	<Button variant="translucent">Translucent</Button>
	<Button variant="ghost">Ghost</Button>
	<Button variant="destructive">Destructive</Button>
</div>

<div class="flex flex-row gap-4">
	<Button variant="prominent" disabled>Prominent</Button>
	<Button variant="bordered" disabled>Bordered</Button>
	<Button variant="secondary" disabled>Secondary</Button>
	<Button variant="translucent" disabled>Translucent</Button>
	<Button variant="ghost" disabled>Ghost</Button>
	<Button variant="destructive" disabled>Destructive</Button>
</div>

<div class="flex flex-row gap-4">
	<Button variant="prominent" size="icon"><Sparkles /></Button>
	<Button variant="bordered" size="icon"><Sparkles /></Button>
	<Button variant="secondary" size="icon"><Sparkles /></Button>
	<Button variant="translucent" size="icon"><Sparkles /></Button>
	<Button variant="ghost" size="icon"><Sparkles /></Button>
	<Button variant="destructive" size="icon"><Sparkles /></Button>
</div>

<div class="flex flex-row gap-4">
	<Button variant="prominent" size="icon" disabled><Sparkles /></Button>
	<Button variant="bordered" size="icon" disabled><Sparkles /></Button>
	<Button variant="secondary" size="icon" disabled><Sparkles /></Button>
	<Button variant="translucent" size="icon" disabled><Sparkles /></Button>
	<Button variant="ghost" size="icon" disabled><Sparkles /></Button>
	<Button variant="destructive" size="icon" disabled><Sparkles /></Button>
</div>
`}
	>
		<div class="flex flex-row gap-4">
			<Button variant="prominent">Prominent</Button>
			<Button variant="bordered">Bordered</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="translucent">Translucent</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="destructive">Destructive</Button>
		</div>

		<div class="flex flex-row gap-4">
			<Button variant="prominent" disabled>Prominent</Button>
			<Button variant="bordered" disabled>Bordered</Button>
			<Button variant="secondary" disabled>Secondary</Button>
			<Button variant="translucent" disabled>Translucent</Button>
			<Button variant="ghost" disabled>Ghost</Button>
			<Button variant="destructive" disabled>Destructive</Button>
		</div>

		<div class="flex flex-row gap-4">
			<Button variant="prominent" size="icon"><Sparkles /></Button>
			<Button variant="bordered" size="icon"><Sparkles /></Button>
			<Button variant="secondary" size="icon"><Sparkles /></Button>
			<Button variant="translucent" size="icon"><Sparkles /></Button>
			<Button variant="ghost" size="icon"><Sparkles /></Button>
			<Button variant="destructive" size="icon"><Sparkles /></Button>
		</div>

		<div class="flex flex-row gap-4">
			<Button variant="prominent" size="icon" disabled><Sparkles /></Button>
			<Button variant="bordered" size="icon" disabled><Sparkles /></Button>
			<Button variant="secondary" size="icon" disabled><Sparkles /></Button>
			<Button variant="translucent" size="icon" disabled><Sparkles /></Button>
			<Button variant="ghost" size="icon" disabled><Sparkles /></Button>
			<Button variant="destructive" size="icon" disabled><Sparkles /></Button>
		</div>
	</CodeAccordion>
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Prefix and suffix</h1>
		<p class="text-md text-muted-foreground">Buttons can have prefix and suffix icons.</p>
	</div>
	<CodeAccordion
		code={`<${"script"} lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Plus, X, Search, ArrowDown, Save, Trash } from "@lucide/svelte";
</${"script"}>

<div class="flex flex-row gap-4">
	<Button variant="translucent"><Plus /> Add</Button>
	<Button variant="translucent"><X /> Remove</Button>
	<Button variant="translucent"><Search /> Search</Button>
</div>
<div class="flex flex-row gap-4">
	<Button variant="translucent">Download<ArrowDown class="size-4" /></Button>
	<Button variant="translucent">Save<Save class="size-4" /></Button>
	<Button variant="translucent">Delete<Trash class="size-4" /></Button>
</div>`}
	>
		<div class="flex flex-row gap-4">
			<Button variant="translucent"><Plus /> Add</Button>
			<Button variant="translucent"><X /> Remove</Button>
			<Button variant="translucent"><Search /> Search</Button>
		</div>
		<div class="flex flex-row gap-4">
			<Button variant="translucent">Download<ArrowDown class="size-4" /></Button>
			<Button variant="translucent">Save<Save class="size-4" /></Button>
			<Button variant="translucent">Delete<Trash class="size-4" /></Button>
		</div>
	</CodeAccordion>
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Best practices</h1>
		<p class="text-md text-muted-foreground">The best practices when using buttons.</p>
	</div>
	<ul class="list-disc pl-5 flex flex-col gap-4 text-muted-foreground">
		<li>Choose clear, verb-first text (e.g., "Save Changes" or "Delete Project") rather than vague labels like "Submit" or "OK".</li>
		<li>Use only one Prominent button per view to draw focus to the primary action. Use Secondary, Bordered, or Translucent variants for fallback choices, and Ghost for other tools.</li>
		<li>
			Only use the Destructive variant for dangerous actions. Consider pairing it with a confirmation prompt or <a
				class="inline-flex items-center gap-1 text-primary align-middle"
				href="/components/dialog"><img src="/logo/pictorial.png" alt="logo" class="size-4" />Dialog</a
			> to prevent accidental data loss.
		</li>
		<li>
			Set the <code>disabled</code> property to prevent user interaction during loading or when required fields are missing, maintaining a predictable UI.
		</li>
	</ul>
</div>

<div class="flex flex-col gap-6 w-full p-12">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Props</h1>
		<p class="text-md text-muted-foreground">The props available for the Button component.</p>
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
					<td class="p-4 font-mono font-bold text-foreground">variant</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">"prominent" | "bordered" | "secondary" | "translucent" | "ghost" | "destructive"</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">"prominent"</td>
					<td class="p-4 text-muted-foreground">The visual style variant of the button.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">size</td>
					<td class="p-4 font-mono text-xs">"xs" | "sm" | "default" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">"default"</td>
					<td class="p-4 text-muted-foreground">The size variation of the button (including icon-only shapes).</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">href</td>
					<td class="p-4 font-mono text-xs">string</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">undefined</td>
					<td class="p-4 text-muted-foreground">If provided, renders the button as an anchor tag `&lt;a&gt;`.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">magnetic</td>
					<td class="p-4 font-mono text-xs">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">true</td>
					<td class="p-4 text-muted-foreground">Enables the physics-based elastic magnetic pulling effect towards the cursor.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">scale</td>
					<td class="p-4 font-mono text-xs">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">true</td>
					<td class="p-4 text-muted-foreground">Enables tactile spring scaling response when pressed.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">specular</td>
					<td class="p-4 font-mono text-xs">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">true</td>
					<td class="p-4 text-muted-foreground">Enables dynamic 3D specular highlight reflections that track cursor movement.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">specularAngle</td>
					<td class="p-4 font-mono text-xs">number</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">undefined</td>
					<td class="p-4 text-muted-foreground">Optional fixed angle for the specular light reflection.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">liquidGlass</td>
					<td class="p-4 font-mono text-xs">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">false</td>
					<td class="p-4 text-muted-foreground">Enables physical liquid glass refraction distortion (Chromium only).</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">refractiveIndex</td>
					<td class="p-4 font-mono text-xs">number</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">2.4</td>
					<td class="p-4 text-muted-foreground">Index of refraction (IOR) for the glass surface curvature. Range 1.0 (air) to 2.4.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">bezelWidth</td>
					<td class="p-4 font-mono text-xs">number</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">20</td>
					<td class="p-4 text-muted-foreground">Depth of the glass bezel refraction boundary zone (px).</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">displacementScale</td>
					<td class="p-4 font-mono text-xs">number</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">40</td>
					<td class="p-4 text-muted-foreground">Strength of the physical refraction displacement offset.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">surfaceProfile</td>
					<td class="p-4 font-mono text-xs">"circle" | "squircle" | "concave" | "lip"</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">"squircle"</td>
					<td class="p-4 text-muted-foreground">3D bezel outline profile contour style.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">chromaticAberration</td>
					<td class="p-4 font-mono text-xs">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">false</td>
					<td class="p-4 text-muted-foreground">Enables realistic RGB channel prism splitting refraction at bezel edges.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">saturationBoost</td>
					<td class="p-4 font-mono text-xs">number</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">1.3</td>
					<td class="p-4 text-muted-foreground">Color saturation boost multiplier inside refracted zone.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">backgroundBlur</td>
					<td class="p-4 font-mono text-xs">number</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">0.3</td>
					<td class="p-4 text-muted-foreground">Pre-blur factor applied to background to hide SVG rendering artifacts.</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<!--<NavigationStack.Root>
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
			<div class="h-64 w-full flex items-center justify-center bg-[url(/bg_rotating.gif)] bg-cover rounded-3xl relative shadow-md overflow-hidden group">
				<div class="relative z-10">
					<Button {variant} {size} {magnetic} {scale} {specular} {disabled} liquidGlass={true} class="shadow-xl">
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
-->
