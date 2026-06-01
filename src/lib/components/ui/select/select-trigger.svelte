<script lang="ts">
	import { Select as SelectPrimitive } from "bits-ui";
	import { cn, type WithoutChild } from "$lib/utils.js";
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import { onDestroy } from "svelte";

	type Props = WithoutChild<SelectPrimitive.TriggerProps> & {
		specular?: boolean;
		specularAngle?: number;
		scale?: boolean;
		magnetic?: boolean;
	};

	let { ref = $bindable(null), class: className, children, specular = true, specularAngle = undefined, scale = true, magnetic = true, style, ...restProps }: Props = $props();

	let hoverAngle = $state<number | null>(null);
	let ripples = $state<{ id: number; x: number; y: number; size: number; isReleased: boolean }[]>([]);
	let nextRippleId = 0;
	let currentActiveRippleId = $state<number | null>(null);
	let isDraggingTrigger = $state(false);

	let triggerTranslateX = $state(0);
	let triggerTranslateY = $state(0);
	let triggerScaleX = $state(1);
	let triggerScaleY = $state(1);
	let triggerRect = $state<DOMRect | null>(null);

	function handlePointerMove(e: PointerEvent) {
		if (currentActiveRippleId !== null || isDraggingTrigger) return;
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

	function handlePointerMoveWindow(e: PointerEvent) {
		if (!triggerRect) return;

		const x = e.clientX - triggerRect.left;
		const y = e.clientY - triggerRect.top;

		if (currentActiveRippleId !== null) {
			ripples = ripples.map((r) => {
				if (r.id === currentActiveRippleId) {
					return { ...r, x, y };
				}
				return r;
			});
		}

		const cx = triggerRect.left + triggerRect.width / 2;
		const cy = triggerRect.top + triggerRect.height / 2;
		const dx = e.clientX - cx;
		const dy = e.clientY - cy;
		const angleRad = Math.atan2(dy, dx);
		const angleDeg = angleRad * (180 / Math.PI);
		hoverAngle = angleDeg + 270;

		if (magnetic || scale) {
			const rx = triggerRect.width / 2;
			const ry = triggerRect.height / 2;
			const offX = x - rx;
			const offY = y - ry;
			const distance = Math.sqrt(offX * offX + offY * offY);

			if (scale) {
				triggerScaleX = 1.05;
				triggerScaleY = 1.05;
			}

			if (distance > 0) {
				if (magnetic) {
					const maxPull = 16;
					const pullStrength = 0.12;
					const pullX = (offX / distance) * Math.min(distance * pullStrength, maxPull);
					const pullY = (offY / distance) * Math.min(distance * pullStrength, maxPull);

					triggerTranslateX = pullX;
					triggerTranslateY = pullY;
				}

				if (scale) {
					const stretchFactor = 0.006;
					const activeTranslateX = magnetic ? triggerTranslateX : offX;
					const activeTranslateY = magnetic ? triggerTranslateY : offY;
					triggerScaleX = Math.max(0.95, 1.05 + Math.abs(activeTranslateX) * stretchFactor - Math.abs(activeTranslateY) * 0.003);
					triggerScaleY = Math.max(0.95, 1.05 + Math.abs(activeTranslateY) * stretchFactor - Math.abs(activeTranslateX) * 0.003);
				}
			}
		}
	}

	function handlePointerDown(e: PointerEvent) {
		if (e.pointerType === "mouse" && e.button !== 0) return;
		const target = e.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		triggerRect = rect;
		isDraggingTrigger = true;

		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const size = Math.max(rect.width, rect.height) * 2.5;

		const id = nextRippleId++;
		const newRipple = { id, x, y, size, isReleased: false };
		ripples.push(newRipple);
		currentActiveRippleId = id;

		if (scale) {
			triggerScaleX = 1.05;
			triggerScaleY = 1.05;
		}

		if (magnetic || scale) {
			const rx = rect.width / 2;
			const ry = rect.height / 2;
			const offX = x - rx;
			const offY = y - ry;
			const distance = Math.sqrt(offX * offX + offY * offY);

			if (distance > 0) {
				if (magnetic) {
					const pullX = (offX / distance) * Math.min(distance * 0.12, 12);
					const pullY = (offY / distance) * Math.min(distance * 0.12, 12);
					triggerTranslateX = pullX;
					triggerTranslateY = pullY;
				}

				if (scale) {
					const stretchFactor = 0.006;
					const activeTranslateX = magnetic ? triggerTranslateX : offX;
					const activeTranslateY = magnetic ? triggerTranslateY : offY;
					triggerScaleX = Math.max(0.95, 1.05 + Math.abs(activeTranslateX) * stretchFactor - Math.abs(activeTranslateY) * 0.003);
					triggerScaleY = Math.max(0.95, 1.05 + Math.abs(activeTranslateY) * stretchFactor - Math.abs(activeTranslateX) * 0.003);
				}
			}
		}

		if (typeof window !== "undefined") {
			window.addEventListener("pointermove", handlePointerMoveWindow);
			window.addEventListener("pointerup", handleRelease);
			window.addEventListener("pointercancel", handleRelease);
		}
	}

	function handleRelease() {
		ripples = ripples.map((r) => {
			if (!r.isReleased) {
				const rid = r.id;
				setTimeout(() => {
					ripples = ripples.filter((rip) => rip.id !== rid);
				}, 450);
				return { ...r, isReleased: true };
			}
			return r;
		});

		currentActiveRippleId = null;
		isDraggingTrigger = false;
		triggerRect = null;

		triggerTranslateX = 0;
		triggerTranslateY = 0;
		triggerScaleX = 1;
		triggerScaleY = 1;

		if (typeof window !== "undefined") {
			window.removeEventListener("pointermove", handlePointerMoveWindow);
			window.removeEventListener("pointerup", handleRelease);
			window.removeEventListener("pointercancel", handleRelease);
		}
	}

	function handleMouseLeave() {
		if (currentActiveRippleId === null && !isDraggingTrigger) {
			hoverAngle = null;
		}
	}

	function triggerTransition(node: HTMLElement) {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				node.classList.add("is-holding");
			});
		});
	}

	onDestroy(() => {
		if (typeof window !== "undefined") {
			window.removeEventListener("pointermove", handlePointerMoveWindow);
			window.removeEventListener("pointerup", handleRelease);
			window.removeEventListener("pointercancel", handleRelease);
		}
	});

	let showSpecular = $derived(specular || specularAngle !== undefined);
	let activeAngle = $derived(hoverAngle !== null ? hoverAngle : (specularAngle ?? -45));

	let transformParts = $derived.by(() => {
		if (!isDraggingTrigger && currentActiveRippleId === null) return [];
		const parts: string[] = [];
		if (magnetic) {
			parts.push(`translate3d(${triggerTranslateX}px, ${triggerTranslateY}px, 0)`);
		} else {
			parts.push(`translate3d(0, 0, 0)`);
		}
		if (scale) {
			parts.push(`scale(${triggerScaleX}, ${triggerScaleY})`);
		} else {
			parts.push(`scale(1)`);
		}
		return parts;
	});

	let transformStyle = $derived(transformParts.length > 0 ? `transform: ${transformParts.join(" ")};` : "");

	let triggerStyle = $derived(`${style ?? ""}; ${showSpecular ? `--specular-angle: ${activeAngle}deg;` : ""} ${transformStyle}`);
</script>

<div
	class="select-trigger-wrapper relative w-fit inline-flex rounded-full overflow-hidden"
	role="presentation"
	onpointermove={handlePointerMove}
	onpointerdown={handlePointerDown}
	onmouseleave={handleMouseLeave}
	style={triggerStyle}
>
	<div class="ripple-container">
		{#each ripples as ripple (ripple.id)}
			<div use:triggerTransition class="ripple" class:is-released={ripple.isReleased} style="left: {ripple.x}px; top: {ripple.y}px; width: {ripple.size}px; height: {ripple.size}px;"></div>
		{/each}
	</div>
	<SelectPrimitive.Trigger
		bind:ref
		data-slot="select-trigger"
		data-size={"default"}
		class={cn(
			"border-input data-placeholder:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 gap-1.5 rounded-full border bg-transparent py-2 pr-2 pl-2.5 text-sm shadow-xs transition-[color,box-shadow] data-[size=default]:h-10 *:data-[slot=select-value]:flex *:data-[slot=select-value]:gap-1.5 [&_svg:not([class*='size-'])]:size-4 flex w-fit items-center justify-between whitespace-nowrap outline-none disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center [&_svg]:pointer-events-none [&_svg]:shrink-0 relative z-10",
			className,
		)}
		{...restProps}
	>
		{@render children?.()}
		<ChevronDownIcon class="text-muted-foreground size-4 pointer-events-none ml-1.5" />
	</SelectPrimitive.Trigger>
	{#if showSpecular}
		<div class="select-trigger-specular pointer-events-none absolute inset-0 rounded-full z-20"></div>
	{/if}
</div>

<style>
	@property --specular-angle {
		syntax: "<angle>";
		inherits: true;
		initial-value: -45deg;
	}

	.select-trigger-wrapper {
		transition:
			transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
			background-color 0.2s,
			border-color 0.2s;
		transform: translate3d(0, 0, 0);
	}

	.select-trigger-specular {
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

	.select-trigger-wrapper:hover .select-trigger-specular,
	.select-trigger-wrapper:focus-within .select-trigger-specular {
		transition: none;
	}

	.ripple-container {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		border-radius: inherit;
		z-index: 0;
	}

	.ripple {
		position: absolute;
		transform: translate(-50%, -50%) scale(0.4);
		opacity: 0;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 70%);
		pointer-events: none;
		mix-blend-mode: plus-lighter;
		filter: blur(16px);
		transition:
			transform 1.2s cubic-bezier(0.1, 0.8, 0.2, 1),
			opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1),
			left 0.15s cubic-bezier(0.25, 1, 0.5, 1),
			top 0.15s cubic-bezier(0.25, 1, 0.5, 1);
	}

	.ripple:global(.is-holding) {
		transform: translate(-50%, -50%) scale(0.65);
		opacity: 1;
	}

	.ripple:global(.is-holding.is-released) {
		transform: translate(-50%, -50%) scale(1.4);
		opacity: 0;
		transition:
			transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
			opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1);
	}
</style>
