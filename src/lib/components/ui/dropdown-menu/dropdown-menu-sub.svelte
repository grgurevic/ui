<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import { getContext, untrack } from "svelte";

	let { open = $bindable(false), ...restProps }: DropdownMenuPrimitive.SubProps = $props();

	const parentState = getContext<{ registerSubOpen: (isOpen: boolean) => void }>("dropdown-menu-content-state");

	$effect(() => {
		const isOpen = open;
		if (parentState) {
			untrack(() => {
				parentState.registerSubOpen(isOpen);
			});
			return () => {
				untrack(() => {
					parentState.registerSubOpen(false);
				});
			};
		}
	});
</script>

<DropdownMenuPrimitive.Sub bind:open {...restProps} />
