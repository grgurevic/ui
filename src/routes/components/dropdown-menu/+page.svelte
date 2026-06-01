<script lang="ts">
	import * as NavigationStack from "$lib/components/navigationStack";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Button } from "$lib/components/ui/button";
	import CodeBlock from "$lib/components/codeblock.svelte";
	import { ChevronLeft, User, Settings, CreditCard, Plus, Mail, MessageSquare, LogOut, Sparkles } from "@lucide/svelte";

	// Settings state
	let showSidebar = $state(true);
	let showStatusBar = $state(false);
	let themeMode = $state("dark");

	// Generated Code
	let generatedCode = $derived.by(() => {
		return `<script lang="ts">
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Button } from "$lib/components/ui/button";
	import { User, Settings, LogOut } from "lucide-svelte";
</${"script"}>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Button>Open Options</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="end">
		<DropdownMenu.Label>My Account</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item>
				<User class="mr-2 size-4" />
				<span>Profile</span>
				<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<Settings class="mr-2 size-4" />
				<span>Settings</span>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item variant="destructive">
			<LogOut class="mr-2 size-4" />
			<span>Log out</span>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>`;
	});
</script>

<NavigationStack.Root>
	<NavigationStack.Header title="Dropdown Menu">
		{#snippet leading()}
			<Button variant="translucent" size="icon" href="/components">
				<ChevronLeft class="size-4" />
			</Button>
		{/snippet}
	</NavigationStack.Header>

	<div class="flex flex-col gap-20 px-6 py-12 w-full max-w-4xl">
		<div class="flex flex-col gap-2">
			<NavigationStack.LargeTitle>Dropdown Menu</NavigationStack.LargeTitle>
			<p class="text-md text-muted-foreground max-w-2xl">
				A highly modular dropdown popover designed to arrange nested navigation hooks, shortcuts, binary toggles, radio selectors, and deep dropdown branches under a beautiful glass backdrop.
			</p>
		</div>

		<div class="flex flex-col gap-3">
			<span class="text-sm font-semibold text-muted-foreground ml-1">Preview</span>
			<div class="h-64 w-full flex items-center justify-center bg-card rounded-3xl relative border border-border/20 shadow-md gap-4 select-none">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Button variant="prominent" class="shadow-xl" {...props}>Actions Menu</Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="w-56" align="center">
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

						<DropdownMenu.Group>
							<DropdownMenu.Sub>
								<DropdownMenu.SubTrigger>
									<Plus class="mr-2 size-4" />
									<span>Invite Users</span>
								</DropdownMenu.SubTrigger>
								<DropdownMenu.SubContent sideOffset={-180}>
									<DropdownMenu.Item>
										<Mail class="mr-2 size-4" />
										<span>Email Invitation</span>
									</DropdownMenu.Item>
									<DropdownMenu.Item>
										<MessageSquare class="mr-2 size-4" />
										<span>SMS Invitation</span>
									</DropdownMenu.Item>
								</DropdownMenu.SubContent>
							</DropdownMenu.Sub>
						</DropdownMenu.Group>

						<DropdownMenu.Separator />

						<DropdownMenu.Item variant="destructive">
							<LogOut class="mr-2 size-4" />
							<span>Log out</span>
							<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>

				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Button variant="bordered" {...props}>Editor Options</Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content class="w-56" align="center">
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
			</div>
		</div>

		<div class="flex flex-col gap-8 mt-4 w-full">
			<div class="flex flex-col gap-6 justify-center">
				<h3 class="text-md font-bold">Active State bindings</h3>
				<div class="flex flex-col gap-4 border-t border-border/20 pt-4 text-sm">
					<div class="flex flex-row justify-between items-center">
						<span class="text-muted-foreground">Sidebar toggle state:</span>
						<span class="font-bold text-xs px-2 py-0.5 rounded {showSidebar ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}">
							{showSidebar ? "Shown" : "Hidden"}
						</span>
					</div>
					<div class="flex flex-row justify-between items-center">
						<span class="text-muted-foreground">Status Bar toggle state:</span>
						<span class="font-bold text-xs px-2 py-0.5 rounded {showStatusBar ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}">
							{showStatusBar ? "Shown" : "Hidden"}
						</span>
					</div>
					<div class="flex flex-row justify-between items-center">
						<span class="text-muted-foreground">Theme radio selection:</span>
						<span class="font-bold text-xs px-2.5 py-0.5 rounded bg-primary/10 text-primary">
							{themeMode}
						</span>
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-3">
				<span class="text-sm font-semibold text-muted-foreground ml-1">Installation</span>
				<CodeBlock code="npx shadcn-svelte@latest add https://ui.grgurevic.click/r/dropdown-menu.json" lang="bash" />
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

			<div class="flex-1 overflow-x-auto border border-border/20 rounded-2xl bg-card">
				<table class="w-full text-sm border-collapse text-left">
					<thead>
						<tr class="bg-muted/30 border-b border-border/20">
							<th class="p-4 font-semibold text-foreground/80">Component</th>
							<th class="p-4 font-semibold text-foreground/80">Role & Props</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-border/10 font-mono text-xs">
						<tr>
							<td class="p-4 font-bold text-primary">DropdownMenu.Root</td>
							<td class="p-4 text-muted-foreground font-sans">The master toggle coordinator. Mounts and coordinates popup anchor positions.</td>
						</tr>
						<tr>
							<td class="p-4 font-bold text-primary">DropdownMenu.Trigger</td>
							<td class="p-4 text-muted-foreground font-sans">The active click element triggering viewport openings.</td>
						</tr>
						<tr>
							<td class="p-4 font-bold text-primary">DropdownMenu.Content</td>
							<td class="p-4 text-muted-foreground font-sans"
								>The popup container card. Takes <code class="font-mono text-primary font-bold">align="start" | "center" | "end"</code> to set orientation offsets.</td
							>
						</tr>
						<tr>
							<td class="p-4 font-bold text-primary">DropdownMenu.Item</td>
							<td class="p-4 text-muted-foreground font-sans"
								>Standard menu list item. Takes <code class="font-mono text-primary font-bold">variant="default" | "destructive"</code> and
								<code class="font-mono text-primary font-bold">disabled</code> boolean.</td
							>
						</tr>
						<tr>
							<td class="p-4 font-bold text-primary">DropdownMenu.CheckboxItem</td>
							<td class="p-4 text-muted-foreground font-sans">Toggle item. Takes <code class="font-mono text-primary font-bold">bind:checked</code> to link active boolean states.</td>
						</tr>
						<tr>
							<td class="p-4 font-bold text-primary">DropdownMenu.RadioGroup</td>
							<td class="p-4 text-muted-foreground font-sans">Radio capsule grouping exclusive selector parameters. Takes <code class="font-mono text-primary font-bold">bind:value</code>.</td>
						</tr>
						<tr>
							<td class="p-4 font-bold text-primary">DropdownMenu.RadioItem</td>
							<td class="p-4 text-muted-foreground font-sans">Mutually exclusive item option. Takes <code class="font-mono text-primary font-bold">value</code> string.</td>
						</tr>
						<tr>
							<td class="p-4 font-bold text-primary">DropdownMenu.Sub</td>
							<td class="p-4 text-muted-foreground font-sans">Deep dropdown folder trigger to anchor nested sub-dropdown trees.</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</NavigationStack.Root>
