<script lang="ts">
	import CodeAccordion from "$lib/components/code-accordion.svelte";
	import Codeblock from "$lib/components/codeblock.svelte";
	import { Button } from "$lib/components/ui/button";
	import * as NavigationStack from "$lib/components/navigationStack";
	import { ChevronRight, ChevronLeft, Sparkles } from "@lucide/svelte";
</script>

<div class="flex flex-col gap-4 w-full p-12 border-b">
	<h1 class="text-4xl font-semibold">Navigation Stack</h1>
	<p class="text-lg text-muted-foreground">The core shell scaffolding of the system. Implements Apple's signature dynamic title transition, shifting titles to the header as users scroll.</p>
	<Codeblock code="bunx shadcn-svelte@latest add https://ui.grgurevic.click/r/navigation-stack.json" lang="bash" classes="rounded-md border" />
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Usage</h1>
		<p class="text-md text-muted-foreground">The basic setup for a navigation stack with a sticky header and transition effects.</p>
	</div>
	<CodeAccordion
		code={`<${"script"} lang="ts">
	import * as NavigationStack from "$lib/components/navigationStack";
	import { Button } from "$lib/components/ui/button";
	import { ChevronLeft } from "lucide-svelte";
</${"script"}>

<NavigationStack.Root>
	<NavigationStack.Header title="Profile Settings">
		{#snippet leading()}
			<Button variant="translucent" size="icon" onclick={() => history.back()}>
				<ChevronLeft class="size-4" />
			</Button>
		{/snippet}
	</NavigationStack.Header>

	<div class="p-6">
		<NavigationStack.LargeTitle>Profile Settings</NavigationStack.LargeTitle>
	</div>
</NavigationStack.Root>`}
	>
		<div class="w-full flex justify-center py-6">
			<div class="w-full max-w-sm border rounded-lg bg-card overflow-hidden shadow-lg select-none">
				<div class="border-b bg-muted/10 p-4 flex justify-between items-center text-xs font-semibold">
					<div class="flex items-center gap-1 text-primary">
						<ChevronLeft class="size-3.5" /> Back
					</div>
					<div class="text-foreground">Profile Settings</div>
					<div class="w-8"></div>
				</div>
				<div class="p-6">
					<h1 class="text-xl font-bold">Profile Settings</h1>
					<p class="text-xs text-muted-foreground mt-2">Simulated view of the Navigation Stack page structure.</p>
				</div>
			</div>
		</div>
	</CodeAccordion>
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Best practices</h1>
		<p class="text-md text-muted-foreground">The best practices when using navigation stacks.</p>
	</div>
	<ul class="list-disc pl-5 flex flex-col gap-4 text-muted-foreground">
		<li>Ensure the header title exactly matches the large title for consistent scroll transitions.</li>
		<li>
			Always place a back <a class="inline-flex items-center gap-1 text-primary hover:underline align-middle" href="/components/button"><img src="/logo/pictorial.png" alt="logo" class="size-4" />Button</a> or dismiss action in the leading header slot.
		</li>
		<li>Avoid putting dense, multiline descriptions in the sticky header bar.</li>
		<li>
			For content that slides in from the edge rather than pushing a new view, prefer a <a class="inline-flex items-center gap-1 text-primary hover:underline align-middle" href="/components/sheet"><img src="/logo/pictorial.png" alt="logo" class="size-4" />Sheet</a> instead.
		</li>
	</ul>
</div>

<div class="flex flex-col gap-6 w-full p-12">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Components & Props</h1>
		<p class="text-md text-muted-foreground">Navigation Stack sub-components and parameters.</p>
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
					<td class="p-4 font-mono font-bold text-foreground">NavigationStack.Root</td>
					<td class="p-4 text-muted-foreground font-sans">Context coordinator</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">-</td>
					<td class="p-4 text-muted-foreground">Sets up reactive context coordinates (`NavigationStackState`) that bridge headers and large titles across layouts.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">NavigationStack.Header</td>
					<td class="p-4 text-muted-foreground font-sans">Sticky header bar</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">-</td>
					<td class="p-4 text-muted-foreground">The sticky navigation header featuring a centered title and custom layout slots.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">NavigationStack.LargeTitle</td>
					<td class="p-4 text-muted-foreground font-sans">Scroll title block</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">-</td>
					<td class="p-4 text-muted-foreground">Large title block positioned inside standard scroll streams. Registers itself automatically with surrounding parent root providers.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">title</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">string</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">undefined</td>
					<td class="p-4 text-muted-foreground">Small title text fading in on scrolls.</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
