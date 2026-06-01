<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let { ref = $bindable(null), class: className, ...restProps }: DropdownMenuPrimitive.SubContentProps = $props();

	let hoverAngle = $state<number | null>(null);

	function handleMouseMove(e: MouseEvent) {
		const target = e.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const cx = rect.left + rect.width / 2;
		const cy = rect.top + rect.height / 2;
		const dx = e.clientX - cx;
		const dy = e.clientY - cy;
		const angleRad = Math.atan2(dy, dx);
		const angleDeg = angleRad * (180 / Math.PI);
		hoverAngle = angleDeg + 270;
	}

	function handleMouseLeave() {
		hoverAngle = null;
	}

	let activeAngle = $derived(hoverAngle !== null ? hoverAngle : -45);
</script>

<DropdownMenuPrimitive.Portal>
	<DropdownMenuPrimitive.SubContent
		bind:ref
		data-slot="dropdown-menu-sub-content"
		class={cn(
			"data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-background/90 dark:bg-input/80 text-popover-foreground min-w-[96px] rounded-[22px] p-1.5 shadow-xl ring-1 duration-200 transition-all z-100 w-auto overflow-x-hidden overflow-y-auto backdrop-blur-2xl relative isolate outline-none",
			className,
		)}
		style="--specular-angle: {activeAngle}deg;"
		onmousemove={handleMouseMove}
		onmouseleave={handleMouseLeave}
		{...restProps}
	>
		{@render restProps.children?.()}
		<div class="dropdown-subcontent-specular pointer-events-none absolute inset-0 rounded-3xl z-20"></div>
	</DropdownMenuPrimitive.SubContent>
</DropdownMenuPrimitive.Portal>

<style>
	@property --specular-angle {
		syntax: "<angle>";
		inherits: true;
		initial-value: -45deg;
	}

	.dropdown-subcontent-specular {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		padding: 0.8px;
		background: linear-gradient(var(--specular-angle, -45deg), rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 15%, rgba(255, 255, 255, 0) 85%, rgba(255, 255, 255, 0.12) 94%);
		-webkit-mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask:
			linear-gradient(#fff 0 0) content-box exclude,
			linear-gradient(#fff 0 0);
		mask-composite: exclude;
		mix-blend-mode: plus-lighter;
		transition: --specular-angle 0.4s cubic-bezier(0.16, 1, 0.3, 1);
		pointer-events: none;
	}

	:global(div[data-slot="dropdown-menu-sub-content"]:hover) .dropdown-subcontent-specular {
		transition: none;
	}
</style>
