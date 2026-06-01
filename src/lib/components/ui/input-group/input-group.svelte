<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { onDestroy } from "svelte";

	type Props = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		specular?: boolean;
		specularAngle?: number;
		scale?: boolean;
		magnetic?: boolean;
	};

	let { ref = $bindable(null), class: className, children, specular = true, specularAngle = undefined, scale = true, magnetic = true, style, ...props }: Props = $props();

	let hoverAngle = $state<number | null>(null);
	let ripples = $state<{ id: number; x: number; y: number; size: number; isReleased: boolean }[]>([]);
	let nextRippleId = 0;
	let currentActiveRippleId = $state<number | null>(null);
	let isDraggingGroup = $state(false);

	let inputTranslateX = $state(0);
	let inputTranslateY = $state(0);
	let inputScaleX = $state(1);
	let inputScaleY = $state(1);
	let inputRect = $state<DOMRect | null>(null);

	function handlePointerMove(e: PointerEvent) {
		if (currentActiveRippleId !== null || isDraggingGroup) return;
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
		if (!inputRect) return;

		const x = e.clientX - inputRect.left;
		const y = e.clientY - inputRect.top;

		if (currentActiveRippleId !== null) {
			ripples = ripples.map((r) => {
				if (r.id === currentActiveRippleId) {
					return { ...r, x, y };
				}
				return r;
			});
		}

		const cx = inputRect.left + inputRect.width / 2;
		const cy = inputRect.top + inputRect.height / 2;
		const dx = e.clientX - cx;
		const dy = e.clientY - cy;
		const angleRad = Math.atan2(dy, dx);
		const angleDeg = angleRad * (180 / Math.PI);
		hoverAngle = angleDeg + 270;

		if (magnetic || scale) {
			const rx = inputRect.width / 2;
			const ry = inputRect.height / 2;
			const offX = x - rx;
			const offY = y - ry;
			const distance = Math.sqrt(offX * offX + offY * offY);

			if (scale) {
				inputScaleX = 1.02;
				inputScaleY = 1.02;
			}

			if (distance > 0) {
				if (magnetic) {
					const maxPull = 12;
					const pullStrength = 0.08;
					const pullX = (offX / distance) * Math.min(distance * pullStrength, maxPull);
					const pullY = (offY / distance) * Math.min(distance * pullStrength, maxPull);

					inputTranslateX = pullX;
					inputTranslateY = pullY;
				}

				if (scale) {
					const stretchFactor = 0.004;
					const activeTranslateX = magnetic ? inputTranslateX : offX;
					const activeTranslateY = magnetic ? inputTranslateY : offY;
					inputScaleX = Math.max(0.97, 1.02 + Math.abs(activeTranslateX) * stretchFactor - Math.abs(activeTranslateY) * 0.002);
					inputScaleY = Math.max(0.97, 1.02 + Math.abs(activeTranslateY) * stretchFactor - Math.abs(activeTranslateX) * 0.002);
				}
			}
		}
	}

	function handlePointerDown(e: PointerEvent) {
		const target = e.target as HTMLElement;
		if (target.closest('button, a, [role="button"]')) return;
		if (e.pointerType === "mouse" && e.button !== 0) return;

		const currentTarget = e.currentTarget as HTMLElement;
		const rect = currentTarget.getBoundingClientRect();
		inputRect = rect;
		isDraggingGroup = true;

		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const size = Math.max(rect.width, rect.height) * 2.5;

		const id = nextRippleId++;
		const newRipple = { id, x, y, size, isReleased: false };
		ripples.push(newRipple);
		currentActiveRippleId = id;

		if (scale) {
			inputScaleX = 1.02;
			inputScaleY = 1.02;
		}

		if (magnetic || scale) {
			const rx = rect.width / 2;
			const ry = rect.height / 2;
			const offX = x - rx;
			const offY = y - ry;
			const distance = Math.sqrt(offX * offX + offY * offY);

			if (distance > 0) {
				if (magnetic) {
					const pullX = (offX / distance) * Math.min(distance * 0.08, 10);
					const pullY = (offY / distance) * Math.min(distance * 0.08, 10);
					inputTranslateX = pullX;
					inputTranslateY = pullY;
				}

				if (scale) {
					const stretchFactor = 0.004;
					const activeTranslateX = magnetic ? inputTranslateX : offX;
					const activeTranslateY = magnetic ? inputTranslateY : offY;
					inputScaleX = Math.max(0.97, 1.02 + Math.abs(activeTranslateX) * stretchFactor - Math.abs(activeTranslateY) * 0.002);
					inputScaleY = Math.max(0.97, 1.02 + Math.abs(activeTranslateY) * stretchFactor - Math.abs(activeTranslateX) * 0.002);
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
		isDraggingGroup = false;
		inputRect = null;

		inputTranslateX = 0;
		inputTranslateY = 0;
		inputScaleX = 1;
		inputScaleY = 1;

		if (typeof window !== "undefined") {
			window.removeEventListener("pointermove", handlePointerMoveWindow);
			window.removeEventListener("pointerup", handleRelease);
			window.removeEventListener("pointercancel", handleRelease);
		}
	}

	function handleMouseLeave() {
		if (currentActiveRippleId === null && !isDraggingGroup) {
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
		if (!isDraggingGroup && currentActiveRippleId === null) return [];
		const parts: string[] = [];
		if (magnetic) {
			parts.push(`translate3d(${inputTranslateX}px, ${inputTranslateY}px, 0)`);
		} else {
			parts.push(`translate3d(0, 0, 0)`);
		}
		if (scale) {
			parts.push(`scale(${inputScaleX}, ${inputScaleY})`);
		} else {
			parts.push(`scale(1)`);
		}
		return parts;
	});

	let transformStyle = $derived(transformParts.length > 0 ? `transform: ${transformParts.join(" ")};` : "");

	let inputGroupStyle = $derived(`${style ?? ""}; ${showSpecular ? `--specular-angle: ${activeAngle}deg;` : ""} ${transformStyle}`);
</script>

<div
	bind:this={ref}
	data-slot="input-group"
	role="group"
	class={cn(
		"border border-black/5 dark:border-white/10 dark:bg-input/30 group/input-group has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 h-10 rounded-full shadow-xs transition-[color,box-shadow] in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-[[data-slot][aria-invalid=true]]:ring-3 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5 relative flex w-full min-w-0 items-center outline-none has-[>textarea]:h-auto",
		className,
	)}
	style={inputGroupStyle}
	onpointermove={handlePointerMove}
	onpointerdown={handlePointerDown}
	onmouseleave={handleMouseLeave}
	{...props}
>
	<div class="ripple-container">
		{#each ripples as ripple (ripple.id)}
			<div use:triggerTransition class="ripple" class:is-released={ripple.isReleased} style="left: {ripple.x}px; top: {ripple.y}px; width: {ripple.size}px; height: {ripple.size}px;"></div>
		{/each}
	</div>
	{@render children?.()}
	{#if showSpecular}
		<div class="input-group-specular pointer-events-none absolute rounded-full z-20"></div>
	{/if}
</div>

<style>
	@property --specular-angle {
		syntax: "<angle>";
		inherits: true;
		initial-value: -45deg;
	}

	div[data-slot="input-group"] {
		transition:
			transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
			background-color 0.2s,
			border-color 0.2s;
		transform: translate3d(0, 0, 0);
	}

	.input-group-specular {
		position: absolute;
		inset: -1px;
		border-radius: inherit;
		padding: 1px;
		background: linear-gradient(var(--specular-angle, -45deg), rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 15%, rgba(255, 255, 255, 0) 85%, rgba(255, 255, 255, 0.12) 100%);
		-webkit-mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask:
			linear-gradient(#fff 0 0) content-box exclude,
			linear-gradient(#fff 0 0);
		mask-composite: exclude;
		pointer-events: none;
		mix-blend-mode: plus-lighter;
		transition: --specular-angle 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}

	div[data-slot="input-group"]:hover .input-group-specular,
	div[data-slot="input-group"]:focus-within .input-group-specular {
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

	.ripple.is-holding {
		transform: translate(-50%, -50%) scale(0.65);
		opacity: 1;
	}

	.ripple.is-holding.is-released {
		transform: translate(-50%, -50%) scale(1.4);
		opacity: 0;
		transition:
			transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
			opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1);
	}
</style>
