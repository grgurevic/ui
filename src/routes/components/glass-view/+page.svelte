<script lang="ts">
	import CodeAccordion from "$lib/components/code-accordion.svelte";
	import Codeblock from "$lib/components/codeblock.svelte";
	import { GlassView } from "$lib/components/ui/glass-view";
	import { CircleAlert, Compass } from "@lucide/svelte";
</script>

<svelte:head>
	<title>Liquid Glass Svelte Component - Glass View | Grgurevic UI</title>
	<meta
		name="description"
		content="A premium physics-based refractive Liquid Glass component for Svelte 5. Control refractive index, bezel width, chromatic aberration, and specular light reflections in SvelteKit."
	/>
</svelte:head>

<div class="flex flex-col gap-4 w-full p-12 border-b">
	<h1 class="text-4xl font-semibold">Glass View</h1>
	<p class="text-lg text-muted-foreground">The core styling primitive of Grgurevic UI. A premium physics-based refractive container with curvature profiles, light fringing, and specular glare.</p>
	<Codeblock code="bunx shadcn-svelte@latest add https://ui.grgurevic.click/r/glass-view.json" lang="bash" classes="rounded-md border" />
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Usage</h1>
		<p class="text-md text-muted-foreground">A basic refractive container enclosing custom content.</p>
	</div>
	<CodeAccordion
		code={`<${"script"} lang="ts">
	import { GlassView } from "$lib/components/ui/glass-view";
	import { Compass } from "lucide-svelte";
</${"script"}>

<GlassView liquidGlass={true} refractiveIndex={1.5} bezelWidth={24} variant="translucent" class="w-72 h-28 flex flex-col items-center justify-center gap-2 select-none">
	<Compass class="size-7 text-foreground animate-spin-slow" />
	<span class="text-sm font-semibold tracking-wide">Refractive Liquid Glass</span>
</GlassView>`}
	>
		<div class="w-full flex justify-center py-6 select-none">
			<GlassView liquidGlass={true} refractiveIndex={1.5} bezelWidth={24} variant="translucent" class="w-72 h-28 flex flex-col items-center justify-center gap-2 select-none">
				<Compass class="size-7 text-foreground animate-spin-slow" />
				<span class="text-sm font-semibold tracking-wide">Refractive Liquid Glass</span>
			</GlassView>
		</div>
	</CodeAccordion>
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Variants</h1>
		<p class="text-md text-muted-foreground">The backdrop styling variant configuration options.</p>
	</div>
	<CodeAccordion
		code={`<${"script"} lang="ts">
	import { GlassView } from "$lib/components/ui/glass-view";
</${"script"}>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
	<GlassView variant="prominent">Prominent</GlassView>
	<GlassView variant="bordered">Bordered</GlassView>
	<GlassView variant="secondary">Secondary</GlassView>
	<GlassView variant="translucent">Translucent</GlassView>
	<GlassView variant="ghost">Ghost</GlassView>
	<GlassView variant="destructive">Destructive</GlassView>
</div>`}
	>
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6 w-full select-none">
			<GlassView variant="prominent" class="w-full h-28 flex flex-col items-center justify-center gap-1 select-none" liquidGlass={false}>
				<span class="font-semibold text-sm">Prominent</span>
			</GlassView>
			<GlassView variant="bordered" class="w-full h-28 flex flex-col items-center justify-center gap-1 select-none" liquidGlass={false}>
				<span class="font-semibold text-sm">Bordered</span>
			</GlassView>
			<GlassView variant="secondary" class="w-full h-28 flex flex-col items-center justify-center gap-1 select-none" liquidGlass={false}>
				<span class="font-semibold text-sm">Secondary</span>
			</GlassView>
			<GlassView variant="translucent" class="w-full h-28 flex flex-col items-center justify-center gap-1 select-none" liquidGlass={false}>
				<span class="font-semibold text-sm">Translucent</span>
			</GlassView>
			<GlassView variant="ghost" class="w-full h-28 flex flex-col items-center justify-center gap-1 select-none" liquidGlass={false}>
				<span class="font-semibold text-sm">Ghost</span>
			</GlassView>
			<GlassView variant="destructive" class="w-full h-28 flex flex-col items-center justify-center gap-1 select-none" liquidGlass={false}>
				<span class="font-semibold text-sm">Destructive</span>
			</GlassView>
		</div>
	</CodeAccordion>
	<span class="text-sm text-yellow-600 flex flex-row items-center gap-1"><CircleAlert class="size-4" /> Liquid glass disabled in preview for performance reasons</span>
</div>
<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Best practices</h1>
		<p class="text-md text-muted-foreground">The best practices when styling glass elements.</p>
	</div>
	<ul class="list-disc pl-5 flex flex-col gap-4 text-muted-foreground">
		<li>Use the Glass View component sparingly to prevent performance issues and rendering overhead on lower-end devices.</li>
		<li>Keep refractive index settings within a realistic range of 1.2 to 1.8 for standard glass simulations.</li>
		<li>Pair Glass View with high-contrast backgrounds to showcase the edge refraction.</li>
		<li>Disable chromatic aberration on low-end devices to conserve rendering performance. The <a class="inline-flex items-center gap-1 text-primary hover:underline align-middle" href="/components/switch"><img src="/logo/pictorial.png" alt="logo" class="size-4" />Switch</a> component also supports a <code>liquidGlass</code> prop for consistent glass styling.</li>
		<li>
			Ensure the saturation boost is kept subtle to avoid unrealistic color distortions. Components like <a class="inline-flex items-center gap-1 text-primary hover:underline align-middle" href="/components/button"><img src="/logo/pictorial.png" alt="logo" class="size-4" />Button</a> expose the same glass tuning parameters.
		</li>
	</ul>
</div>

<div class="flex flex-col gap-6 w-full p-12">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Props</h1>
		<p class="text-md text-muted-foreground">The props available for the Glass View component.</p>
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
					<td class="p-4 text-muted-foreground">Backdrop filter/opacity configuration.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">size</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">"xs" | "sm" | "default" | "lg"</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">"default"</td>
					<td class="p-4 text-muted-foreground">Paddings configuration.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">magnetic</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">true</td>
					<td class="p-4 text-muted-foreground">Pulls the card toward the pointer using spring drag parameters.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">scale</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">true</td>
					<td class="p-4 text-muted-foreground">Squeezes on holding and click actions.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">specular</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">true</td>
					<td class="p-4 text-muted-foreground">Projects precise 3D specular light glare onto borders.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">liquidGlass</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">false</td>
					<td class="p-4 text-muted-foreground">Enables the Apple-inspired physical glass refraction and specular overlay.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">refractiveIndex</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">number</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">1.5</td>
					<td class="p-4 text-muted-foreground">The index of refraction (IOR). Simulates realistic physical bending of background light.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">bezelWidth</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">number</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">20</td>
					<td class="p-4 text-muted-foreground">The width of the refraction zone around the element's border (in pixels).</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">displacementScale</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">number</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">40</td>
					<td class="p-4 text-muted-foreground">SVG displacement mapping strength. Controls the magnitude of pixel shift.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">surfaceProfile</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">"circle" | "squircle" | "concave" | "lip"</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">"squircle"</td>
					<td class="p-4 text-muted-foreground">The height curve shape of the bezel. "squircle" matches Apple's design curvature perfectly.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">chromaticAberration</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">false</td>
					<td class="p-4 text-muted-foreground">Enables 3-channel (RGB) parallel displacement to produce hyper-realistic rainbow fringing.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">saturationBoost</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">number</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">1.3</td>
					<td class="p-4 text-muted-foreground">Amplifies color saturation inside the glass container to simulate prism color amplification.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">backgroundBlur</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">number</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">0.3</td>
					<td class="p-4 text-muted-foreground">Slight pre-blur parameter to prevent hard pixels and alias edges inside the refraction.</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

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
