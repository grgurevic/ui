<script lang="ts">
	import * as NavigationStack from "$lib/components/navigationStack";
	import * as Dialog from "$lib/components/ui/dialog";
	import { Button } from "$lib/components/ui/button";
	import CodeBlock from "$lib/components/codeblock.svelte";
	import { ChevronLeft, Info, Sparkles } from "@lucide/svelte";

	// Generated Code
	let generatedCode = $derived.by(() => {
		return `<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { Button } from "$lib/components/ui/button";
</${"script"}>

<Dialog.Root>
	<Dialog.Trigger>
		<Button>Trigger System Prompts</Button>
	</Dialog.Trigger>
	<Dialog.Content class="max-w-xs">
		<Dialog.Header>
			<Dialog.Title>Allow Notifications?</Dialog.Title>
			<Dialog.Description>Notifications may include alerts, sounds and icon badges.</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer class="flex flex-row gap-2">
			<Dialog.Close>
				{#snippet child({ props })}
					<Button variant="bordered" class="flex-1" {...props}>Don't Allow</Button>
				{/snippet}
			</Dialog.Close>
			<Dialog.Close>
				{#snippet child({ props })}
					<Button variant="prominent" class="flex-1" {...props}>Allow</Button>
				{/snippet}
			</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>`;
	});
</script>

<NavigationStack.Root>
	<NavigationStack.Header title="Dialog">
		{#snippet leading()}
			<Button variant="translucent" size="icon" href="/components">
				<ChevronLeft class="size-4" />
			</Button>
		{/snippet}
	</NavigationStack.Header>

	<div class="flex flex-col gap-20 px-6 py-12 w-full max-w-4xl">
		<div class="flex flex-col gap-2">
			<NavigationStack.LargeTitle>Dialog</NavigationStack.LargeTitle>
			<p class="text-md text-muted-foreground max-w-2xl">
				A highly tactile system dialog card. Mounts modal alert promoters featuring progressive dark overlays, Apple-spec blur backdrops, bold prompt headers, and elastic button layouts.
			</p>
		</div>

		<div class="flex flex-col gap-3">
			<span class="text-sm font-semibold text-muted-foreground ml-1">Preview</span>
			<div
				class="h-64 w-full flex flex-col items-center justify-center bg-[url(https://www.iclarified.com/images/news/97554/465552/465552.jpg)] bg-cover rounded-3xl relative border border-border/20 shadow-md overflow-hidden group select-none"
			>
				<div class="absolute inset-0 bg-black/10 backdrop-blur-xs"></div>

				<Dialog.Root>
					<Dialog.Trigger>
						{#snippet child({ props })}
							<Button variant="prominent" class="shadow-2xl" {...props}>Trigger Dialog Alert</Button>
						{/snippet}
					</Dialog.Trigger>
					<Dialog.Content>
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
						<span class="font-mono font-bold text-primary text-sm">Dialog.Root</span>
					</div>
					<p class="text-sm text-muted-foreground">Coordinates dialog modal visibility, aria focus controls, and screen-blur bounds.</p>
				</div>

				<div class="flex flex-col gap-3 py-6 border-b border-border/10 last:border-b-0">
					<div class="flex items-center gap-2">
						<span class="font-mono font-bold text-primary text-sm">Dialog.Trigger</span>
					</div>
					<p class="text-sm text-muted-foreground">Clickable button or anchor mapping standard trigger bounds.</p>
				</div>

				<div class="flex flex-col gap-3 py-6 border-b border-border/10 last:border-b-0">
					<div class="flex items-center gap-2">
						<span class="font-mono font-bold text-primary text-sm">Dialog.Content</span>
					</div>
					<p class="text-sm text-muted-foreground">The floating glass prompt box styled with fade-in and scale-in Svelte animations.</p>
				</div>
			</div>
		</div>
	</div>
</NavigationStack.Root>
