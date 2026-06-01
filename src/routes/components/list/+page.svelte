<script lang="ts">
	import * as NavigationStack from "$lib/components/navigationStack";
	import * as List from "$lib/components/ui/list";
	import { Switch } from "$lib/components/ui/switch";
	import { Button } from "$lib/components/ui/button";
	import CodeBlock from "$lib/components/codeblock.svelte";
	import { ChevronLeft, ChevronRight, Plane, Wifi, Bluetooth, Antenna, Bell, BellOff, Volume2, ShieldAlert } from "@lucide/svelte";
	import { scale } from "svelte/transition";
	// Settings state
	let airplaneMode = $state(false);
	let silentMode = $state(false);
	let wifiState = $derived(airplaneMode ? "Off" : "grgurevic-fast");
	let bluetoothState = $derived(airplaneMode ? "Off" : "On");

	// Generated Code
	let generatedCode = $derived.by(() => {
		return `<script lang="ts">
	import * as List from "$lib/components/ui/list";
	import { Switch } from "$lib/components/ui/switch";
	import { Plane, Wifi } from "lucide-svelte";
</${"script"}>

<List.Section header="Network Settings" footer="Wi-Fi is turned off in Airplane Mode.">
	<List.Root>
		<List.Row class="flex justify-between items-center">
			<div class="flex items-center gap-3">
				<Plane class="bg-orange-500 p-1 rounded-md size-7 text-white" />
				<span>Airplane Mode</span>
			</div>
			<Switch bind:checked={airplaneMode} />
		</List.Row>

		<List.Row class="flex justify-between items-center" href="/wifi-details">
			<div class="flex items-center gap-3">
				<Wifi class="bg-blue-500 p-1 rounded-md size-7 text-white" />
				<span>Wi-Fi</span>
			</div>
			<span class="text-muted-foreground flex items-center gap-1">
				{wifiState} <ChevronRight class="size-4" />
			</span>
		</List.Row>
	</List.Root>
</List.Section>`;
	});
</script>

<NavigationStack.Root>
	<NavigationStack.Header title="List / Row">
		{#snippet leading()}
			<Button variant="translucent" size="icon" href="/components">
				<ChevronLeft class="size-4" />
			</Button>
		{/snippet}
	</NavigationStack.Header>

	<div class="flex flex-col gap-20 px-6 py-12 w-full max-w-4xl">
		<div class="flex flex-col gap-2">
			<NavigationStack.LargeTitle>List / Row</NavigationStack.LargeTitle>
			<p class="text-md text-muted-foreground max-w-2xl">
				A structured suite designed to mimic the signature, premium segmented tables of Apple system settings. Features automated hairline borders, padded headers, detailed footers, and active click
				highlights.
			</p>
		</div>

		<div class="flex flex-col gap-3">
			<span class="text-sm font-semibold text-muted-foreground ml-1">Preview</span>
			<div class="py-10 w-full flex items-center justify-center border-y border-border/10 gap-4">
				<div class="w-full max-w-sm flex flex-col gap-6 select-none">
					<List.Section header="Network Connectivity">
						<List.Root>
							<List.Row>
								<div class="flex flex-row items-center gap-3">
									<Plane class="size-7 p-1 bg-orange-400 text-white rounded-md" strokeWidth={3} />
									<span class="text-sm font-medium">Airplane Mode</span>
								</div>
								<Switch bind:checked={airplaneMode} />
							</List.Row>
							<List.Row href="#wifi">
								<div class="flex flex-row items-center gap-3">
									<Wifi class="size-7 p-1 bg-blue-500 text-white rounded-md" strokeWidth={3} />
									<span class="text-sm font-medium">Wi-Fi</span>
								</div>
								<div class="text-muted-foreground flex flex-row items-center gap-1 text-sm font-medium">
									{wifiState}
									<ChevronRight class="size-4" />
								</div>
							</List.Row>
							<List.Row href="#bluetooth">
								<div class="flex flex-row items-center gap-3">
									<Bluetooth class="size-7 p-1 bg-blue-500 text-white rounded-md" strokeWidth={3} />
									<span class="text-sm font-medium">Bluetooth</span>
								</div>
								<div class="text-muted-foreground flex flex-row items-center gap-1 text-sm font-medium">
									{bluetoothState}
									<ChevronRight class="size-4" />
								</div>
							</List.Row>
						</List.Root>
					</List.Section>

					<List.Section
						header="Sounds & Alerts"
						footer={silentMode ? "Phone will remain silent. Alarms and video audio will still output normal volume levels." : "Normal ringer alerts and system sound cues are currently active."}
					>
						<List.Root>
							<List.Row>
								<div class="relative flex flex-row gap-4">
									{#if silentMode}
										<div>
											<BellOff class="animate-in fade-in zoom-in size-5 text-muted-foreground" />
										</div>
									{:else}
										<div>
											<Bell class="animate-in fade-in zoom-in size-5 text-red-500" />
										</div>
									{/if}
									<span class="text-sm font-medium">Silent Mode</span>
								</div>
								<Switch bind:checked={silentMode} />
							</List.Row>
						</List.Root>
					</List.Section>
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-3 mt-4">
			<span class="text-sm font-semibold text-muted-foreground ml-1">Svelte Composition Code</span>
			<CodeBlock code={generatedCode} lang="svelte" />
		</div>

		<div class="flex flex-col gap-4 mt-8">
			<h3 class="text-base font-bold text-foreground ml-1">API & Sub-components Reference</h3>

			<div class="flex flex-col gap-6">
				<div class="flex flex-col gap-3 py-6 border-b border-border/10 last:border-b-0">
					<div class="flex items-center gap-2">
						<span class="font-mono font-bold text-primary text-sm">List.Section</span>
					</div>
					<p class="text-sm text-muted-foreground">Groups associated root elements together under structured system-wide segments.</p>
					<ul class="text-xs font-mono flex flex-col gap-1 border-t border-border/10 pt-2 text-foreground/80 mt-1">
						<li>• <span class="font-bold text-primary">header:</span> string - Optional text label positioned above the group.</li>
						<li>• <span class="font-bold text-primary">footer:</span> string - Optional explanatory text positioned directly below.</li>
					</ul>
				</div>

				<div class="flex flex-col gap-3 py-6 border-b border-border/10 last:border-b-0">
					<div class="flex items-center gap-2">
						<span class="font-mono font-bold text-primary text-sm">List.Root</span>
					</div>
					<p class="text-sm text-muted-foreground">The direct wrapper surrounding rows. Smooths and locks border radiuses at corner bounds automatically.</p>
				</div>

				<div class="flex flex-col gap-3 py-6 border-b border-border/10 last:border-b-0">
					<div class="flex items-center gap-2">
						<span class="font-mono font-bold text-primary text-sm">List.Row</span>
					</div>
					<p class="text-sm text-muted-foreground">A flexbox row segment providing automatic separators and hover highlight events.</p>
					<ul class="text-xs font-mono flex flex-col gap-1 border-t border-border/10 pt-2 text-foreground/80 mt-1">
						<li>• <span class="font-bold text-primary">href:</span> string - Target URL page link (transforms root into an `a` anchor).</li>
						<li>• <span class="font-bold text-primary">onclick:</span> function - Click handler callback (transforms root into a `button`).</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</NavigationStack.Root>
