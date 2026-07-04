<script lang="ts">
	import CodeAccordion from "$lib/components/code-accordion.svelte";
	import Codeblock from "$lib/components/codeblock.svelte";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { ChevronRight, Ellipsis, Heart, Share2, Sparkles } from "@lucide/svelte";
</script>

<div class="flex flex-col gap-4 w-full p-12 border-b">
	<h1 class="text-4xl font-semibold">Card</h1>
	<p class="text-lg text-muted-foreground">A highly customizable content panel supporting headers, custom actions, content, and footers.</p>
	<Codeblock code="bunx shadcn-svelte@latest add https://ui.grgurevic.click/r/card.json" lang="bash" classes="rounded-md border" />
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Basic Card</h1>
		<p class="text-md text-muted-foreground">A basic card panel with title, description, content, and footer.</p>
	</div>
	<CodeAccordion
		code={`<${"script"} lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
</${"script"}>

<Card.Root class="w-full max-w-sm bg-card/60 select-none">
	<Card.Header>
		<Card.Title>Smart Thermostat</Card.Title>
		<Card.Description>Intelligent climate control.</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="text-3xl font-bold">72°F</div>
	</Card.Content>
	<Card.Footer class="flex justify-between items-center">
		<span class="text-xs text-muted-foreground">HomeKit Connected</span>
		<Button size="sm">Configure</Button>
	</Card.Footer>
</Card.Root>`}
	>
		<Card.Root class="w-full max-w-sm bg-card/60 select-none" scale magnetic ripple>
			<Card.Header>
				<Card.Title>Climate</Card.Title>
				<Card.Description>Configure your climate device.</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="text-3xl font-bold">16°C</div>
			</Card.Content>
			<Card.Footer class="flex justify-between items-end">
				<span class="text-xs text-muted-foreground">HomeKit Connected</span>
				<Button size="sm">Configure</Button>
			</Card.Footer>
		</Card.Root>
	</CodeAccordion>
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Sizes</h1>
		<p class="text-md text-muted-foreground">Cards are available in default and small (sm) padding dimensions.</p>
	</div>
	<CodeAccordion
		code={`<${"script"} lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
</${"script"}>

<div class="flex flex-col md:flex-row justify-center gap-6 py-6 w-full">
	<Card.Root size="default" class="max-w-xs h-fit bg-card/60 select-none">
		<Card.Header>
			<Card.Title>Standard Card</Card.Title>
			<Card.Description>Default padding and spacing.</Card.Description>
		</Card.Header>
		<Card.Content>
			<p class="text-sm text-muted-foreground">This card uses the standard default sizing specs.</p>
		</Card.Content>
	</Card.Root>
	<Card.Root size="sm" class="max-w-xs h-fit bg-card/60 select-none">
		<Card.Header>
			<Card.Title>Small Card</Card.Title>
			<Card.Description>Tighter padding and spacing.</Card.Description>
		</Card.Header>
		<Card.Content>
			<p class="text-sm text-muted-foreground">This card uses compact sm sizing specs.</p>
		</Card.Content>
	</Card.Root>
</div>`}
	>
		<div class="flex flex-col md:flex-row justify-center gap-6 py-6 w-full">
			<Card.Root size="default" class="max-w-xs h-fit bg-card/60 select-none">
				<Card.Header>
					<Card.Title>Standard Card</Card.Title>
					<Card.Description>Default padding and spacing.</Card.Description>
				</Card.Header>
				<Card.Content>
					<p class="text-sm text-muted-foreground">This card uses the standard default sizing specs.</p>
				</Card.Content>
			</Card.Root>
			<Card.Root size="sm" class="max-w-xs h-fit bg-card/60 select-none">
				<Card.Header>
					<Card.Title>Small Card</Card.Title>
					<Card.Description>Tighter padding and spacing.</Card.Description>
				</Card.Header>
				<Card.Content>
					<p class="text-sm text-muted-foreground">This card uses compact sm sizing specs.</p>
				</Card.Content>
			</Card.Root>
		</div>
	</CodeAccordion>
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Interactive Effects</h1>
		<p class="text-md text-muted-foreground">Enabling magnetic physics, press scaling, clicks ripples, and boundary specular reflections.</p>
	</div>
	<CodeAccordion
		code={`<${"script"} lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { Heart, Share2 } from "@lucide/svelte";
</${"script"}>

<Card.Root
	magnetic={true}
	scale={true}
	ripple={true}
	specular={true}
	liquidGlass={true}
	class="w-full max-w-sm bg-card/60 backdrop-blur-md"
>
	<Card.Header>
		<Card.Title>Refractive Card</Card.Title>
		<Card.Description>Refracts backgrounds and shines with interactive light reflections.</Card.Description>
	</Card.Header>
	<Card.Content>
		<p class="text-sm text-muted-foreground">Try hovering, dragging, or pressing this card to experience the elastic springs and specular glare.</p>
	</Card.Content>
	<Card.Footer class="flex justify-end gap-2">
		<Button variant="translucent" size="icon"><Heart class="size-4" /></Button>
		<Button variant="translucent" size="icon"><Share2 class="size-4" /></Button>
	</Card.Footer>
</Card.Root>`}
	>
		<div class="w-full flex justify-center py-6">
			<Card.Root magnetic={true} scale={true} ripple={true} specular={true} liquidGlass={true} class="w-full max-w-sm select-none bg-card/60">
				<Card.Header>
					<Card.Title>Refractive Card</Card.Title>
					<Card.Description>Refracts backgrounds and shines with interactive light reflections.</Card.Description>
				</Card.Header>
				<Card.Content>
					<p class="text-sm text-muted-foreground">Try hovering, dragging, or pressing this card to experience the elastic springs and specular glare.</p>
				</Card.Content>
				<Card.Footer class="flex justify-end gap-2">
					<Button variant="translucent" size="icon"><Heart class="size-4" /></Button>
					<Button variant="translucent" size="icon"><Share2 class="size-4" /></Button>
				</Card.Footer>
			</Card.Root>
		</div>
	</CodeAccordion>
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Best practices</h1>
		<p class="text-md text-muted-foreground">The best practices when using cards.</p>
	</div>
	<ul class="list-disc pl-5 flex flex-col gap-4 text-muted-foreground">
		<li>Use cards to group related pieces of information, keeping dashboard interfaces structured and readable.</li>
		<li>
			Avoid nesting too many complex interactive elements like <a class="inline-flex items-center gap-1 text-primary hover:underline align-middle" href="/components/button"><img src="/logo/pictorial.png" alt="logo" class="size-4" />Button</a> or <a class="inline-flex items-center gap-1 text-primary hover:underline align-middle" href="/components/slider"><img src="/logo/pictorial.png" alt="logo" class="size-4" />Slider</a> inside a card when magnetic physics or scale are enabled.
		</li>
		<li>Keep card descriptions short and to the point, leaving content-heavy details inside the card body.</li>
		<li>
			Use a <a class="inline-flex items-center gap-1 text-primary hover:underline align-middle" href="/components/dialog"><img src="/logo/pictorial.png" alt="logo" class="size-4" />Dialog</a> instead of a card for content that requires user confirmation before proceeding.
		</li>
	</ul>
</div>

<div class="flex flex-col gap-6 w-full p-12">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Props</h1>
		<p class="text-md text-muted-foreground">The props available for the Card component.</p>
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
					<td class="p-4 font-mono font-bold text-foreground">size</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">"default" | "sm"</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">"default"</td>
					<td class="p-4 text-muted-foreground">Defines internal padding/spacing. "sm" is more compact.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">magnetic</td>
					<td class="p-4 font-mono text-xs">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">false</td>
					<td class="p-4 text-muted-foreground">Enables physics-based elastic magnetic pulling effect towards the cursor.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">scale</td>
					<td class="p-4 font-mono text-xs">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">false</td>
					<td class="p-4 text-muted-foreground">Enables tactile spring scaling response when pressed.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">ripple</td>
					<td class="p-4 font-mono text-xs">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">false</td>
					<td class="p-4 text-muted-foreground">Enables high-fidelity ambient light ripples on surface clicks.</td>
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
