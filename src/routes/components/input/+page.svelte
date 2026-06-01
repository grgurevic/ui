<script lang="ts">
	import * as NavigationStack from "$lib/components/navigationStack";
	import { Input } from "$lib/components/ui/input";
	import { Switch } from "$lib/components/ui/switch";
	import { Button } from "$lib/components/ui/button";
	import CodeBlock from "$lib/components/codeblock.svelte";
	import { ChevronLeft, Info } from "@lucide/svelte";

	// Input states
	let inputValue = $state("");
	let clearButton = $state(true);
	let specular = $state(true);
	let magnetic = $state(true);
	let scale = $state(true);
	let ripple = $state(true);

	// Generated Code
	let generatedCode = $derived.by(() => {
		const props = [`bind:value={value}`];
		if (!clearButton) props.push(`clearButton={false}`);
		if (!specular) props.push(`specular={false}`);
		if (!magnetic) props.push(`magnetic={false}`);
		if (!scale) props.push(`scale={false}`);
		if (!ripple) props.push(`ripple={false}`);

		const propsStr = props.join(" ");
		return `<script lang="ts">
	let value = $state("");
	import { Input } from "$lib/components/ui/input";
</${"script"}>

<Input placeholder="Enter username..." ${propsStr} />`;
	});
</script>

<NavigationStack.Root>
	<NavigationStack.Header title="Input">
		{#snippet leading()}
			<Button variant="translucent" size="icon" href="/components">
				<ChevronLeft class="size-4" />
			</Button>
		{/snippet}
	</NavigationStack.Header>

	<div class="flex flex-col gap-20 px-6 py-12 w-full max-w-4xl">
		<div class="flex flex-col gap-2">
			<NavigationStack.LargeTitle>Input</NavigationStack.LargeTitle>
			<p class="text-md text-muted-foreground max-w-2xl">
				A highly custom text input component featuring native-feeling iOS clear-text triggers, smooth focus ring shadows, specular glares, and elastic click ripple wiggles.
			</p>
		</div>

		<div class="flex flex-col gap-3">
			<span class="text-sm font-semibold text-muted-foreground ml-1">Preview</span>
			<div class="py-10 w-full flex flex-col items-center justify-center border-y border-border/10 gap-4">
				<div class="w-full max-w-xs flex flex-col gap-2">
					<Input bind:value={inputValue} {clearButton} {specular} {magnetic} {scale} {ripple} placeholder="Type search query..." />
				</div>

				<span class="text-xs text-muted-foreground font-semibold mt-2">
					Value: <span class="text-primary font-bold">{inputValue || '""'}</span>
				</span>
			</div>
		</div>

		<div class="flex flex-col gap-8 mt-4 w-full">
			<div class="flex flex-col gap-6">
				<span class="text-sm font-semibold text-muted-foreground ml-1">Configuration</span>

				<div class="flex flex-col gap-4">
					<div class="flex flex-row justify-between items-center">
						<div class="flex flex-col gap-0.5">
							<span class="text-sm font-medium">Automatic Clear Button</span>
							<span class="text-xs text-muted-foreground">Appends trailing 'X' when text is present</span>
						</div>
						<Switch bind:checked={clearButton} />
					</div>

					<div class="flex flex-row justify-between items-center border-t border-border/10 pt-4">
						<div class="flex flex-col gap-0.5">
							<span class="text-sm font-medium">Specular Boundary Glare</span>
							<span class="text-xs text-muted-foreground">Simulates metallic screen boundary lights</span>
						</div>
						<Switch bind:checked={specular} />
					</div>

					<div class="flex flex-row justify-between items-center border-t border-border/10 pt-4">
						<div class="flex flex-col gap-0.5">
							<span class="text-sm font-medium">Elastic Cursor Magnet</span>
							<span class="text-xs text-muted-foreground">Slightly attracts field layout to cursor</span>
						</div>
						<Switch bind:checked={magnetic} />
					</div>

					<div class="flex flex-row justify-between items-center border-t border-border/10 pt-4">
						<div class="flex flex-col gap-0.5">
							<span class="text-sm font-medium">Pointer Press Ripple</span>
							<span class="text-xs text-muted-foreground">Spawns light waves on surface click actions</span>
						</div>
						<Switch bind:checked={ripple} />
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-3">
				<span class="text-sm font-semibold text-muted-foreground ml-1">Installation</span>
				<CodeBlock code="npx shadcn-svelte@latest add https://ui.grgurevic.click/r/input.json" lang="bash" />
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
							<td class="p-4 font-mono text-xs">string | number</td>
							<td class="p-4 font-mono text-xs">""</td>
							<td class="p-4 text-muted-foreground">Two-way bindable active value representing the textual input.</td>
						</tr>
						<tr>
							<td class="p-4 font-mono font-bold text-primary">clearButton</td>
							<td class="p-4 font-mono text-xs">boolean</td>
							<td class="p-4 font-mono text-xs">false</td>
							<td class="p-4 text-muted-foreground">Appends a dynamic trailing clear button matching native iOS input behavior.</td>
						</tr>
						<tr>
							<td class="p-4 font-mono font-bold text-primary">specular</td>
							<td class="p-4 font-mono text-xs">boolean</td>
							<td class="p-4 font-mono text-xs">true</td>
							<td class="p-4 text-muted-foreground">Projects dynamic light border reflection overlay on mouse hover events.</td>
						</tr>
						<tr>
							<td class="p-4 font-mono font-bold text-primary">magnetic</td>
							<td class="p-4 font-mono text-xs">boolean</td>
							<td class="p-4 font-mono text-xs">true</td>
							<td class="p-4 text-muted-foreground">Slightly attracts field container towards cursor position during drag motions.</td>
						</tr>
						<tr>
							<td class="p-4 font-mono font-bold text-primary">ripple</td>
							<td class="p-4 font-mono text-xs">boolean</td>
							<td class="p-4 font-mono text-xs">true</td>
							<td class="p-4 text-muted-foreground">Enables high-fidelity ambient click ripples.</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</NavigationStack.Root>
