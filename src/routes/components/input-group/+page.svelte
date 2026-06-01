<script lang="ts">
	import * as NavigationStack from "$lib/components/navigationStack";
	import * as InputGroup from "$lib/components/ui/input-group";
	import { Switch } from "$lib/components/ui/switch";
	import { Button } from "$lib/components/ui/button";
	import CodeBlock from "$lib/components/codeblock.svelte";
	import { ChevronLeft, Search, SearchIcon, Sparkles } from "@lucide/svelte";

	// Input Group state
	let value = $state("");
	let specular = $state(true);
	let magnetic = $state(true);
	let scale = $state(true);

	// Generated Code
	let generatedCode = $derived.by(() => {
		const props = [];
		if (!specular) props.push(`specular={false}`);
		if (!magnetic) props.push(`magnetic={false}`);
		if (!scale) props.push(`scale={false}`);

		const propsStr = props.length > 0 ? " " + props.join(" ") : "";
		return `<script lang="ts">
	import * as InputGroup from "$lib/components/ui/input-group";
	import { Search } from "lucide-svelte";
</${"script"}>

<InputGroup.Root${propsStr}>
	<InputGroup.Input placeholder="Search system docs..." />
	<InputGroup.Addon>
		<Search class="size-4" />
	</InputGroup.Addon>
	<InputGroup.Addon align="inline-end">
		<InputGroup.Button>Search</InputGroup.Button>
	</InputGroup.Addon>
</InputGroup.Root>`;
	});
</script>

<NavigationStack.Root>
	<NavigationStack.Header title="Input Group">
		{#snippet leading()}
			<Button variant="translucent" size="icon" href="/components">
				<ChevronLeft class="size-4" />
			</Button>
		{/snippet}
	</NavigationStack.Header>

	<div class="flex flex-col gap-20 px-6 py-12 w-full max-w-4xl">
		<div class="flex flex-col gap-2">
			<NavigationStack.LargeTitle>Input Group</NavigationStack.LargeTitle>
			<p class="text-md text-muted-foreground max-w-2xl">
				A layout wrapper designed to encapsulate inputs, icons, and buttons under a unified glass capsule. The entire block acts as a single cohesive magnetic and specular physics boundary.
			</p>
		</div>

		<div class="flex flex-col gap-3">
			<span class="text-sm font-semibold text-muted-foreground ml-1">Preview</span>
			<div class="h-56 w-full flex items-center justify-center bg-card rounded-3xl relative border border-border/20 shadow-md p-6">
				<div class="w-full max-w-sm">
					<InputGroup.Root {specular} {magnetic} {scale}>
						<InputGroup.Input placeholder="Search system settings..." bind:value />
						<InputGroup.Addon>
							<SearchIcon class="size-4 text-muted-foreground" />
						</InputGroup.Addon>
						<InputGroup.Addon align="inline-end">
							<InputGroup.Button onclick={() => alert(`Searching for: ${value}`)}>Search</InputGroup.Button>
						</InputGroup.Addon>
					</InputGroup.Root>
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-8 mt-4 w-full">
			<div class="flex flex-col gap-6">
				<span class="text-sm font-semibold text-muted-foreground ml-1">Configuration</span>

				<div class="flex flex-col gap-4">
					<div class="flex flex-row justify-between items-center">
						<div class="flex flex-col gap-0.5">
							<span class="text-sm font-medium">Specular Highlighting</span>
							<span class="text-xs text-muted-foreground">Aligns shiny reflection bounds along capsule border</span>
						</div>
						<Switch bind:checked={specular} />
					</div>

					<div class="flex flex-row justify-between items-center border-t border-border/10 pt-4">
						<div class="flex flex-col gap-0.5">
							<span class="text-sm font-medium">Magnetic Elastic Force</span>
							<span class="text-xs text-muted-foreground">Capsule shifts towards pointer upon hovering</span>
						</div>
						<Switch bind:checked={magnetic} />
					</div>

					<div class="flex flex-row justify-between items-center border-t border-border/10 pt-4">
						<div class="flex flex-col gap-0.5">
							<span class="text-sm font-medium">Haptic Hold Scaling</span>
							<span class="text-xs text-muted-foreground">Squeezes entire group capsule upon clicks</span>
						</div>
						<Switch bind:checked={scale} />
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-3">
				<span class="text-sm font-semibold text-muted-foreground ml-1">Installation</span>
				<CodeBlock code="npx shadcn-svelte@latest add https://ui.grgurevic.click/r/input-group.json" lang="bash" />
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

			<div class="flex flex-col gap-6">
				<div class="flex flex-col gap-3 py-6 border-b border-border/10 last:border-b-0">
					<div class="flex items-center gap-2">
						<span class="font-mono font-bold text-primary text-sm">InputGroup.Root</span>
					</div>
					<p class="text-sm text-muted-foreground">Capsule container orchestrating mouse movements, specular borders, and scale wiggles.</p>
					<ul class="text-xs font-mono flex flex-col gap-1 border-t border-border/10 pt-2 text-foreground/80 mt-1">
						<li>• <span class="font-bold text-primary">specular:</span> boolean (true) - Enables 3D border reflection glare.</li>
						<li>• <span class="font-bold text-primary">magnetic:</span> boolean (true) - Attracts capsule center to pointer.</li>
						<li>• <span class="font-bold text-primary">scale:</span> boolean (true) - Compresses capsule bounds on press.</li>
					</ul>
				</div>

				<div class="flex flex-col gap-3 py-6 border-b border-border/10 last:border-b-0">
					<div class="flex items-center gap-2">
						<span class="font-mono font-bold text-primary text-sm">InputGroup.Input</span>
					</div>
					<p class="text-sm text-muted-foreground">The inner text input element. Bypasses normal borders to let the capsule contain it cleanly.</p>
				</div>

				<div class="flex flex-col gap-3 py-6 border-b border-border/10 last:border-b-0">
					<div class="flex items-center gap-2">
						<span class="font-mono font-bold text-primary text-sm">InputGroup.Addon</span>
					</div>
					<p class="text-sm text-muted-foreground">Padded section enclosing leading icons or tailing action buttons.</p>
					<ul class="text-xs font-mono flex flex-col gap-1 border-t border-border/10 pt-2 text-foreground/80 mt-1">
						<li>• <span class="font-bold text-primary">align:</span> "inline-start" | "inline-end" | "block-start" | "block-end" - Sets padding boundary alignments.</li>
					</ul>
				</div>

				<div class="flex flex-col gap-3 py-6 border-b border-border/10 last:border-b-0">
					<div class="flex items-center gap-2">
						<span class="font-mono font-bold text-primary text-sm">InputGroup.Button</span>
					</div>
					<p class="text-sm text-muted-foreground">Compact tailing button styled to blend inside the capsule outline.</p>
				</div>
			</div>
		</div>
	</div>
</NavigationStack.Root>
