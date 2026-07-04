<script lang="ts">
	import CodeAccordion from "$lib/components/code-accordion.svelte";
	import Codeblock from "$lib/components/codeblock.svelte";
	import { Button } from "$lib/components/ui/button";
	import * as Dialog from "$lib/components/ui/dialog";
	import { ChevronRight, Sparkles } from "@lucide/svelte";
</script>

<div class="flex flex-col gap-4 w-full p-12 border-b">
	<h1 class="text-4xl font-semibold">Dialog</h1>
	<p class="text-lg text-muted-foreground">A highly tactile modal dialog alert with Apple-spec blur backdrops and elastic animations.</p>
	<Codeblock code="bunx shadcn-svelte@latest add https://ui.grgurevic.click/r/dialog.json" lang="bash" classes="rounded-md border" />
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Usage</h1>
		<p class="text-md text-muted-foreground">Click the button below to trigger the refractive dialog overlay.</p>
	</div>
	<CodeAccordion
		code={`<${"script"} lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { Button } from "$lib/components/ui/button";
</${"script"}>

<Dialog.Root>
	<Dialog.Trigger>
		<Button variant="prominent">Trigger Dialog Alert</Button>
	</Dialog.Trigger>
	<Dialog.Content liquidGlass={true}>
		<Dialog.Header>
			<Dialog.Title>Allow Notifications?</Dialog.Title>
			<Dialog.Description>Notifications may include alerts, sounds, and icon badges.</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer>
			<Dialog.Close>
				<Button variant="translucent" class="flex-1 text-xs">Don't Allow</Button>
			</Dialog.Close>
			<Dialog.Close>
				<Button variant="prominent" class="flex-1 text-xs font-bold">Allow</Button>
			</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>`}
	>
		<div class="w-full flex justify-center py-6">
			<Dialog.Root>
				<Dialog.Trigger>
					{#snippet child({ props })}
						<Button variant="prominent" class="shadow-2xl" {...props}>Trigger Dialog Alert</Button>
					{/snippet}
				</Dialog.Trigger>
				<Dialog.Content liquidGlass={true} class="select-none">
					<Dialog.Header>
						<Dialog.Title>Allow Notifications?</Dialog.Title>
						<Dialog.Description>Notifications may include alerts, sounds, and icon badges. You can configure this anytime in settings.</Dialog.Description>
					</Dialog.Header>
					<Dialog.Footer>
						<Dialog.Close>
							{#snippet child({ props })}
								<Button variant="translucent" specular={false} magnetic={false} scale={false} class="flex-1 text-xs" {...props}>Don't Allow</Button>
							{/snippet}
						</Dialog.Close>
						<Dialog.Close>
							{#snippet child({ props })}
								<Button variant="prominent" specular={false} magnetic={false} scale={false} class="flex-1 text-xs font-bold" {...props}>Allow</Button>
							{/snippet}
						</Dialog.Close>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
		</div>
	</CodeAccordion>
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Best practices</h1>
		<p class="text-md text-muted-foreground">The best practices when using dialogs.</p>
	</div>
	<ul class="list-disc pl-5 flex flex-col gap-4 text-muted-foreground">
		<li>Keep title text and descriptions short so the alert message remains scannable.</li>
		<li>
			Always offer a clear, non-destructive escape path using the translucent <a class="inline-flex items-center gap-1 text-primary hover:underline align-middle" href="/components/button"><img src="/logo/pictorial.png" alt="logo" class="size-4" />Button</a> variant.
		</li>
		<li>Position primary action buttons on the right side of the footer for natural scan reading.</li>
		<li>
			For lightweight contextual options, consider using a <a class="inline-flex items-center gap-1 text-primary hover:underline align-middle" href="/components/sheet"><img src="/logo/pictorial.png" alt="logo" class="size-4" />Sheet</a> instead of a full-page dialog overlay.
		</li>
	</ul>
</div>

<div class="flex flex-col gap-6 w-full p-12">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Props</h1>
		<p class="text-md text-muted-foreground">The props available for the Dialog.Content component.</p>
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
					<td class="p-4 font-mono font-bold text-foreground">liquidGlass</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">false</td>
					<td class="p-4 text-muted-foreground">Enables physical liquid glass refraction distortion (Chromium only).</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">refractiveIndex</td>
					<td class="p-4 font-mono text-xs">number</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">1.5</td>
					<td class="p-4 text-muted-foreground">Index of refraction (IOR) for the glass surface curvature. Range 1.0 (air) to 2.4.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">bezelWidth</td>
					<td class="p-4 font-mono text-xs">number</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">30</td>
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
