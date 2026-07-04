<script lang="ts">
	import CodeAccordion from "$lib/components/code-accordion.svelte";
	import Codeblock from "$lib/components/codeblock.svelte";
	import * as InputGroup from "$lib/components/ui/input-group";
	import { SearchIcon, Sparkles } from "@lucide/svelte";

	let searchValue = $state("");
</script>

<div class="flex flex-col gap-4 w-full p-12 border-b">
	<h1 class="text-4xl font-semibold">Input Group</h1>
	<p class="text-lg text-muted-foreground">A layout wrapper designed to encapsulate inputs, icons, and buttons under a unified glass capsule.</p>
	<Codeblock code="bunx shadcn-svelte@latest add https://ui.grgurevic.click/r/input-group.json" lang="bash" classes="rounded-md border" />
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Usage</h1>
		<p class="text-md text-muted-foreground">An input group featuring a leading search icon and a trailing action button.</p>
	</div>
	<CodeAccordion
		code={`<${"script"} lang="ts">
	import * as InputGroup from "$lib/components/ui/input-group";
	import { SearchIcon } from "lucide-svelte";
	let searchValue = $state("");
</${"script"}>

<InputGroup.Root liquidGlass={true}>
	<InputGroup.Input placeholder="Search settings..." bind:value={searchValue} />
	<InputGroup.Addon>
		<SearchIcon class="size-4 text-muted-foreground" />
	</InputGroup.Addon>
	<InputGroup.Addon align="inline-end">
		<InputGroup.Button>Search</InputGroup.Button>
	</InputGroup.Addon>
</InputGroup.Root>`}
	>
		<div class="w-full flex justify-center py-6">
			<div class="w-full max-w-sm select-none">
				<InputGroup.Root liquidGlass={true}>
					<InputGroup.Input placeholder="Search settings..." bind:value={searchValue} />
					<InputGroup.Addon>
						<SearchIcon class="size-4 text-muted-foreground" />
					</InputGroup.Addon>
					<InputGroup.Addon align="inline-end">
						<InputGroup.Button onclick={() => alert(`Searching for: ${searchValue}`)}>Search</InputGroup.Button>
					</InputGroup.Addon>
				</InputGroup.Root>
			</div>
		</div>
	</CodeAccordion>
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Best practices</h1>
		<p class="text-md text-muted-foreground">The best practices when using input groups.</p>
	</div>
	<ul class="list-disc pl-5 flex flex-col gap-4 text-muted-foreground">
		<li>
			Place primary search action <a class="inline-flex items-center gap-1 text-primary hover:underline align-middle" href="/components/button"><img src="/logo/pictorial.png" alt="logo" class="size-4" />Button</a> components inside the trailing addon slot for consistent alignment.
		</li>
		<li>Limit the number of icons or action buttons inside a single input group to avoid clutter.</li>
		<li>Ensure the placeholder text explains the scope of the search or action clearly.</li>
		<li>Keep the container aligned nicely on responsive screen width changes.</li>
	</ul>
</div>

<div class="flex flex-col gap-6 w-full p-12">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Components & Props</h1>
		<p class="text-md text-muted-foreground">Input Group sub-components and customization parameters.</p>
	</div>
	<div class="w-full overflow-x-auto border rounded-md bg-card">
		<table class="w-full text-sm text-left">
			<thead>
				<tr class="border-b">
					<th class="p-4 font-semibold text-foreground">Component / Prop</th>
					<th class="p-4 font-semibold text-foreground">Type / Role</th>
					<th class="p-4 font-semibold text-foreground">Default</th>
					<th class="p-4 font-semibold text-foreground">Description</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-border">
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">InputGroup.Root</td>
					<td class="p-4 text-muted-foreground font-sans">Capsule container</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">-</td>
					<td class="p-4 text-muted-foreground">Orchestrates border reflections, scale responses, and mouse interactions.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">InputGroup.Input</td>
					<td class="p-4 text-muted-foreground font-sans">Text input</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">-</td>
					<td class="p-4 text-muted-foreground">The inner input field which blends borderless inside the capsule outline.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">InputGroup.Addon</td>
					<td class="p-4 text-muted-foreground font-sans">Addon section</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">-</td>
					<td class="p-4 text-muted-foreground">Section for leading/trailing elements. Takes `align="inline-start" | "inline-end"`.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">InputGroup.Button</td>
					<td class="p-4 text-muted-foreground font-sans">Internal action button</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">-</td>
					<td class="p-4 text-muted-foreground">Tailing action button specifically sized to fit inside the capsule boundary.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">specular</td>
					<td class="p-4 font-mono text-xs">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">true</td>
					<td class="p-4 text-muted-foreground">Enables 3D border reflection glare overlays on hover.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">magnetic</td>
					<td class="p-4 font-mono text-xs">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">true</td>
					<td class="p-4 text-muted-foreground">Attracts the capsule center towards the cursor upon pointer hover.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">scale</td>
					<td class="p-4 font-mono text-xs">boolean</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">true</td>
					<td class="p-4 text-muted-foreground">Compresses capsule boundaries elastically when pressed.</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
