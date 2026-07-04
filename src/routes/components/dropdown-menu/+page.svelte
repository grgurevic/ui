<script lang="ts">
	import CodeAccordion from "$lib/components/code-accordion.svelte";
	import Codeblock from "$lib/components/codeblock.svelte";
	import { Button } from "$lib/components/ui/button";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { ChevronRight, CreditCard, Ellipsis, LogOut, Mail, MessageSquare, Plus, Settings, Sparkles, User } from "@lucide/svelte";

	// Settings state
	let showSidebar = $state(true);
	let showStatusBar = $state(false);
	let themeMode = $state("dark");
</script>

<div class="flex flex-col gap-4 w-full p-12 border-b">
	<h1 class="text-4xl font-semibold">Dropdown Menu</h1>
	<p class="text-lg text-muted-foreground">A highly modular dropdown popover designed to arrange nested navigation hooks, shortcuts, and custom toggles under a beautiful glass backdrop.</p>
	<Codeblock code="bunx shadcn-svelte@latest add https://ui.grgurevic.click/r/dropdown-menu.json" lang="bash" classes="rounded-md border" />
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Basic Dropdown</h1>
		<p class="text-md text-muted-foreground">A dropdown displaying user options and actions.</p>
	</div>
	<CodeAccordion
		code={`<${"script"} lang="ts">
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Button } from "$lib/components/ui/button";
	import { User, Settings, CreditCard, LogOut } from "lucide-svelte";
</${"script"}>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button variant="prominent">Actions Menu</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="center" liquidGlass={true}>
		<DropdownMenu.Label>My Account</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item>
				<User class="mr-2 size-4" />
				<span>Profile</span>
				<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<CreditCard class="mr-2 size-4" />
				<span>Billing</span>
				<DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item variant="destructive">
			<LogOut class="mr-2 size-4" />
			<span>Log out</span>
			<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>`}
	>
		<div class="w-full flex justify-center py-6">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Button variant="prominent" class="shadow-xl" {...props}>Actions Menu</Button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-56 select-none" align="center" liquidGlass={true}>
					<DropdownMenu.Label>My Account</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Group>
						<DropdownMenu.Item>
							<User class="mr-2 size-4" />
							<span>Profile</span>
							<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<CreditCard class="mr-2 size-4" />
							<span>Billing</span>
							<DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
						</DropdownMenu.Item>
					</DropdownMenu.Group>
					<DropdownMenu.Separator />
					<DropdownMenu.Item variant="destructive">
						<LogOut class="mr-2 size-4" />
						<span>Log out</span>
						<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</CodeAccordion>
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Toggles & Selection</h1>
		<p class="text-md text-muted-foreground">Checkbox items and radio groups for configuring settings.</p>
	</div>
	<CodeAccordion
		code={`<${"script"} lang="ts">
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Button } from "$lib/components/ui/button";

	let showSidebar = true;
	let showStatusBar = false;
	let themeMode = "dark";
</${"script"}>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button variant="bordered">Editor Options</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="center" liquidGlass={true}>
		<DropdownMenu.Label>Toggles</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.CheckboxItem bind:checked={showSidebar}>
			Show Sidebar
			<DropdownMenu.Shortcut>⌘⌥B</DropdownMenu.Shortcut>
		</DropdownMenu.CheckboxItem>
		<DropdownMenu.CheckboxItem bind:checked={showStatusBar}>
			Show Status Bar
			<DropdownMenu.Shortcut>⌘/</DropdownMenu.Shortcut>
		</DropdownMenu.CheckboxItem>
		<DropdownMenu.Separator />
		<DropdownMenu.Label>Theme Profile</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.RadioGroup bind:value={themeMode}>
			<DropdownMenu.RadioItem value="light">Light Mode</DropdownMenu.RadioItem>
			<DropdownMenu.RadioItem value="dark">Dark Mode</DropdownMenu.RadioItem>
			<DropdownMenu.RadioItem value="system">System Default</DropdownMenu.RadioItem>
		</DropdownMenu.RadioGroup>
	</DropdownMenu.Content>
</DropdownMenu.Root>`}
	>
		<div class="w-full flex flex-col items-center gap-6 py-6">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Button variant="bordered" {...props}>Editor Options</Button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-56 select-none" align="center" liquidGlass={true}>
					<DropdownMenu.Label>Toggles</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.CheckboxItem bind:checked={showSidebar}>
						Show Sidebar
						<DropdownMenu.Shortcut>⌘⌥B</DropdownMenu.Shortcut>
					</DropdownMenu.CheckboxItem>
					<DropdownMenu.CheckboxItem bind:checked={showStatusBar}>
						Show Status Bar
						<DropdownMenu.Shortcut>⌘/</DropdownMenu.Shortcut>
					</DropdownMenu.CheckboxItem>
					<DropdownMenu.Separator />
					<DropdownMenu.Label>Theme Profile</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.RadioGroup bind:value={themeMode}>
						<DropdownMenu.RadioItem value="light">Light Mode</DropdownMenu.RadioItem>
						<DropdownMenu.RadioItem value="dark">Dark Mode</DropdownMenu.RadioItem>
						<DropdownMenu.RadioItem value="system">System Default</DropdownMenu.RadioItem>
					</DropdownMenu.RadioGroup>
				</DropdownMenu.Content>
			</DropdownMenu.Root>

			<div class="flex flex-col gap-3 w-full max-w-xs border rounded-lg p-4 bg-muted/5">
				<div class="flex flex-row justify-between items-center text-sm">
					<span class="text-muted-foreground">Sidebar toggle:</span>
					<span class="font-bold text-xs px-2 py-0.5 rounded {showSidebar ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}">
						{showSidebar ? "Shown" : "Hidden"}
					</span>
				</div>
				<div class="flex flex-row justify-between items-center text-sm">
					<span class="text-muted-foreground">Status Bar toggle:</span>
					<span class="font-bold text-xs px-2 py-0.5 rounded {showStatusBar ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}">
						{showStatusBar ? "Shown" : "Hidden"}
					</span>
				</div>
				<div class="flex flex-row justify-between items-center text-sm">
					<span class="text-muted-foreground">Theme mode selection:</span>
					<span class="font-bold text-xs px-2.5 py-0.5 rounded bg-primary/10 text-primary uppercase">
						{themeMode}
					</span>
				</div>
			</div>
		</div>
	</CodeAccordion>
</div>

<div class="flex flex-col gap-6 w-full p-12 border-b">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Best practices</h1>
		<p class="text-md text-muted-foreground">The best practices when using dropdown menus.</p>
	</div>
	<ul class="list-disc pl-5 flex flex-col gap-4 text-muted-foreground">
		<li>Use separators to logically group related actions and reduce cognitive load.</li>
		<li>Add keyboard shortcuts to standard menu items to assist power users.</li>
		<li>
			Always display destructive actions, such as log out or delete, at the bottom of the list in red. Pair them with a confirmation <a class="inline-flex items-center gap-1 text-primary hover:underline align-middle" href="/components/dialog"><img src="/logo/pictorial.png" alt="logo" class="size-4" />Dialog</a> to prevent accidental data loss.
		</li>
		<li>Limit sub-menu depth to a single level to prevent nested popovers from going out of screen bounds.</li>
	</ul>
</div>

<div class="flex flex-col gap-6 w-full p-12">
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-semibold">Components & Props</h1>
		<p class="text-md text-muted-foreground">Dropdown sub-components and customization parameters.</p>
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
					<td class="p-4 font-mono font-bold text-foreground">DropdownMenu.Root</td>
					<td class="p-4 text-muted-foreground font-sans">Toggle coordinator</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">-</td>
					<td class="p-4 text-muted-foreground">Coordinates dialog modal visibility, focus, and open state.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">DropdownMenu.Trigger</td>
					<td class="p-4 text-muted-foreground font-sans">Trigger element</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">-</td>
					<td class="p-4 text-muted-foreground">Clickable button or anchor opening the dropdown content popover.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">DropdownMenu.Content</td>
					<td class="p-4 text-muted-foreground font-sans">Popover container</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">-</td>
					<td class="p-4 text-muted-foreground">The floating glass container. Accepts alignment parameters like "center", "start", or "end".</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">DropdownMenu.Item</td>
					<td class="p-4 text-muted-foreground font-sans">Standard item</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">-</td>
					<td class="p-4 text-muted-foreground">Menu action option. Accepts "default" or "destructive" variant overrides.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">liquidGlass</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">boolean</td>
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
					<td class="p-4 font-mono text-xs text-muted-foreground">30</td>
					<td class="p-4 text-muted-foreground">Strength of the physical refraction displacement offset.</td>
				</tr>
				<tr>
					<td class="p-4 font-mono font-bold text-foreground">surfaceProfile</td>
					<td class="p-4 font-mono text-xs">"circle" | "squircle" | "concave" | "lip"</td>
					<td class="p-4 font-mono text-xs text-muted-foreground">"squircle"</td>
					<td class="p-4 text-muted-foreground">3D bezel outline profile contour style.</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
