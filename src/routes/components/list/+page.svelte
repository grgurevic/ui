<script lang="ts">
	import CodeAccordion from "$lib/components/code-accordion.svelte";
	import Codeblock from "$lib/components/codeblock.svelte";
	import * as List from "$lib/components/ui/list";
	import { Switch } from "$lib/components/ui/switch";
	import { ChevronRight, Plane, Wifi, Bluetooth, Bell, BellOff } from "@lucide/svelte";

	let airplaneMode = $state(false);
	let silentMode = $state(false);
	let wifiState = $derived(airplaneMode ? "Off" : "grgurevic-fast");
	let bluetoothState = $derived(airplaneMode ? "Off" : "On");
</script>

<div class="flex flex-col gap-4 w-full p-12 border-b">
	<h1 class="text-4xl font-semibold">List / Row</h1>
	<p class="text-lg text-muted-foreground">A structured suite designed to mimic the signature, premium segmented tables of Apple system settings.</p>
	<Codeblock code="bunx shadcn-svelte@latest add https://ui.grgurevic.click/r/list.json" lang="bash" classes="rounded-md border" />
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Usage</h1>
		<p class="text-md text-muted-foreground">A clean settings panel example grouping networking and sound controls.</p>
	</div>
	<CodeAccordion
		code={`<${"script"} lang="ts">
	import * as List from "$lib/components/ui/list";
	import { Switch } from "$lib/components/ui/switch";
	import { Plane, Wifi, Bluetooth, Bell, BellOff, ChevronRight } from "lucide-svelte";

	let airplaneMode = false;
	let wifiState = "grgurevic-fast";
	let bluetoothState = "On";
</${"script"}>

<List.Section header="Network Connectivity">
	<List.Root>
		<List.Row>
			<div class="flex flex-row items-center gap-3">
				<Plane class="size-7 p-1 bg-orange-400 text-white rounded-md" />
				<span class="text-sm font-medium">Airplane Mode</span>
			</div>
			<Switch bind:checked={airplaneMode} />
		</List.Row>
		<List.Row href="#wifi">
			<div class="flex flex-row items-center gap-3">
				<Wifi class="size-7 p-1 bg-blue-500 text-white rounded-md" />
				<span class="text-sm font-medium">Wi-Fi</span>
			</div>
			<div class="text-muted-foreground flex flex-row items-center gap-1 text-sm font-medium">
				{wifiState}
				<ChevronRight class="size-4" />
			</div>
		</List.Row>
	</List.Root>
</List.Section>`}
	>
		<div class="w-full flex justify-center py-6">
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
							<div class="relative flex flex-row gap-4 items-center">
								{#if silentMode}
									<BellOff class="size-5 text-muted-foreground" />
								{:else}
									<Bell class="size-5 text-red-500" />
								{/if}
								<span class="text-sm font-medium">Silent Mode</span>
							</div>
							<Switch bind:checked={silentMode} />
						</List.Row>
					</List.Root>
				</List.Section>
			</div>
		</div>
	</CodeAccordion>
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Best practices</h1>
		<p class="text-md text-muted-foreground">The best practices when using list views.</p>
	</div>
	<ul class="list-disc pl-5 flex flex-col gap-4 text-muted-foreground">
		<li>Keep row labels brief and put descriptive notes in list section footers.</li>
		<li>Choose icons with distinct colors to represent each option for easy recognition.</li>
		<li>
			Use a <a class="inline-flex items-center gap-1 text-primary hover:underline align-middle" href="/components/switch"><img src="/logo/pictorial.png" alt="logo" class="size-4" />Switch</a> in the trailing slot for toggleable settings rows instead of custom checkboxes.
		</li>
		<li>
			Use chevron indicators to denote rows that navigate to sub-views via a <a class="inline-flex items-center gap-1 text-primary hover:underline align-middle" href="/components/navigation-stack"><img src="/logo/pictorial.png" alt="logo" class="size-4" />Navigation Stack</a>.
		</li>
	</ul>
</div>

<div class="flex flex-col gap-6 w-full p-12">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Components & Props</h1>
		<p class="text-md text-muted-foreground">List sub-components and customization parameters.</p>
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
					<td class="p-4 font-mono font-bold text-foreground">List.Section</td>
					<td class="p-4 text-muted-foreground font-sans">Group section</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">-</td>
					<td class="p-4 text-muted-foreground">Groups associated root elements together under structured system-wide segments.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">List.Root</td>
					<td class="p-4 text-muted-foreground font-sans">List container</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">-</td>
					<td class="p-4 text-muted-foreground">The direct wrapper surrounding rows. Smooths and locks border radiuses at corner bounds automatically.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">List.Row</td>
					<td class="p-4 text-muted-foreground font-sans">Flexbox row item</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">-</td>
					<td class="p-4 text-muted-foreground">A flexbox row segment providing automatic separators and hover highlight events.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">header</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">string</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">undefined</td>
					<td class="p-4 text-muted-foreground">Optional text label positioned above the section group.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">footer</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">string</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">undefined</td>
					<td class="p-4 text-muted-foreground">Optional explanatory text positioned directly below the section group.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">href</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">string</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">undefined</td>
					<td class="p-4 text-muted-foreground">Target URL page link (transforms root into an `a` anchor).</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
