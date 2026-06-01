<script lang="ts">
	import * as NavigationStack from "$lib/components/navigationStack";
	import { Button } from "$lib/components/ui/button";
	import CodeBlock from "$lib/components/codeblock.svelte";
	import { ChevronLeft, ChevronRight, Activity, ArrowUp, Compass, Sparkles } from "@lucide/svelte";

	// Generated Code
	let generatedCode = $derived.by(() => {
		return `<script lang="ts">
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
</NavigationStack.Root>`;
	});
</script>

<NavigationStack.Root>
	<NavigationStack.Header title="Navigation Stack">
		{#snippet leading()}
			<Button variant="translucent" size="icon" href="/components">
				<ChevronLeft class="size-4" />
			</Button>
		{/snippet}
	</NavigationStack.Header>

	<div class="flex flex-col gap-20 px-6 py-12 w-full max-w-4xl">
		<div class="flex flex-col gap-2">
			<NavigationStack.LargeTitle>Navigation Stack</NavigationStack.LargeTitle>
			<p class="text-md text-muted-foreground max-w-2xl">
				The core shell scaffolding of the system. Implements Apple's signature dynamic title transition, combining Intersection Observers and elastic GSAP blurs to shift titles as users scroll.
			</p>
		</div>

		<div class="flex flex-col gap-3">
			<span class="text-sm font-semibold text-muted-foreground ml-1">Preview</span>
			<div>No preview since you can scroll on this page and then look at the top</div>
		</div>

		<div class="flex flex-col gap-3 mt-4">
			<span class="text-sm font-semibold text-muted-foreground ml-1">Svelte Composition Code</span>
			<CodeBlock code={generatedCode} lang="svelte" />
		</div>

		<div class="flex flex-col gap-4 mt-8">
			<h3 class="text-base font-bold text-foreground ml-1">API & Props Reference</h3>

			<div class="flex flex-col gap-6">
				<div class="flex flex-col gap-3 py-6 border-b border-border/10 last:border-b-0">
					<div class="flex items-center gap-2">
						<span class="font-mono font-bold text-primary text-sm">NavigationStack.Root</span>
					</div>
					<p class="text-sm text-muted-foreground">Sets up reactive context coordinates (`NavigationStackState`) that bridge headers and large titles across layouts.</p>
				</div>

				<div class="flex flex-col gap-3 py-6 border-b border-border/10 last:border-b-0">
					<div class="flex items-center gap-2">
						<span class="font-mono font-bold text-primary text-sm">NavigationStack.Header</span>
					</div>
					<p class="text-sm text-muted-foreground">The sticky navigation header featuring a centered title and custom layout snippets on both ends.</p>
					<ul class="text-xs font-mono flex flex-col gap-1 border-t border-border/10 pt-2 text-foreground/80 mt-1">
						<li>• <span class="font-bold text-primary">title:</span> string - Small title text fading in on scrolls.</li>
						<li>• <span class="font-bold text-primary">#snippet leading:</span> snippet - Custom buttons positioned on the far left.</li>
						<li>• <span class="font-bold text-primary">#snippet trailing:</span> snippet - Custom buttons positioned on the far right.</li>
					</ul>
				</div>

				<div class="flex flex-col gap-3 py-6 border-b border-border/10 last:border-b-0">
					<div class="flex items-center gap-2">
						<span class="font-mono font-bold text-primary text-sm">NavigationStack.LargeTitle</span>
					</div>
					<p class="text-sm text-muted-foreground">Large title block positioned inside standard scroll streams. Registers itself automatically with surrounding parent root providers.</p>
				</div>
			</div>
		</div>
	</div>
</NavigationStack.Root>
