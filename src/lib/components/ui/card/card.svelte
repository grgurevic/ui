<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { onDestroy } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		size = "default",
		specular = true,
		specularAngle = undefined,
		magnetic = false,
		scale = false,
		ripple = false,
		style,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		size?: "default" | "sm";
		specular?: boolean;
		specularAngle?: number;
		/** Enable magnetic pull-toward-cursor effect */
		magnetic?: boolean;
		/** Enable subtle scale+stretch on hover/press */
		scale?: boolean;
		/** Enable press ripple light burst effect */
		ripple?: boolean;
	} = $props();

	let hoverAngle = $state<number | null>(null);
	let ripples = $state<{ id: number; x: number; y: number; size: number; isReleased: boolean }[]>([]);
	let nextRippleId = 0;
	let currentActiveRippleId = $state<number | null>(null);

	let cardTranslateX = $state(0);
	let cardTranslateY = $state(0);
	let cardScaleX = $state(1);
	let cardScaleY = $state(1);
	let cardRect = $state<DOMRect | null>(null);

	function handlePointerMove(e: PointerEvent) {
		if (currentActiveRippleId !== null) return;
		const target = e.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const cx = rect.left + rect.width / 2;
		const cy = rect.top + rect.height / 2;
		const dx = e.clientX - cx;
		const dy = e.clientY - cy;
		hoverAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 270;
	}

	function handlePointerMoveWindow(e: PointerEvent) {
		if (currentActiveRippleId === null || !cardRect) return;

		const x = e.clientX - cardRect.left;
		const y = e.clientY - cardRect.top;

		ripples = ripples.map((r) => {
			if (r.id === currentActiveRippleId) return { ...r, x, y };
			return r;
		});

		const cx = cardRect.left + cardRect.width / 2;
		const cy = cardRect.top + cardRect.height / 2;
		const dx = e.clientX - cx;
		const dy = e.clientY - cy;
		hoverAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 270;

		if (magnetic || scale) {
			const rx = cardRect.width / 2;
			const ry = cardRect.height / 2;
			const offX = e.clientX - cardRect.left - rx;
			const offY = e.clientY - cardRect.top - ry;
			const distance = Math.sqrt(offX * offX + offY * offY);

			if (distance > 0) {
				if (magnetic) {
					const maxPull = 14;
					const pullStrength = 0.06;
					cardTranslateX = (offX / distance) * Math.min(distance * pullStrength, maxPull);
					cardTranslateY = (offY / distance) * Math.min(distance * pullStrength, maxPull);
				}
				if (scale) {
					const activeX = magnetic ? cardTranslateX : offX;
					const activeY = magnetic ? cardTranslateY : offY;
					cardScaleX = Math.max(0.98, 1.02 + Math.abs(activeX) * 0.003 - Math.abs(activeY) * 0.002);
					cardScaleY = Math.max(0.98, 1.02 + Math.abs(activeY) * 0.003 - Math.abs(activeX) * 0.002);
				}
			}
		}
	}

	function handlePointerDown(e: PointerEvent) {
		if (e.pointerType === "mouse" && e.button !== 0) return;
		if (!ripple && !magnetic && !scale) return;

		const target = e.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		cardRect = rect;

		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		if (ripple) {
			const rippleSize = Math.max(rect.width, rect.height) * 2.5;
			const id = nextRippleId++;
			ripples.push({ id, x, y, size: rippleSize, isReleased: false });
			currentActiveRippleId = id;
		}

		if (magnetic || scale) {
			const rx = rect.width / 2;
			const ry = rect.height / 2;
			const offX = x - rx;
			const offY = y - ry;
			const distance = Math.sqrt(offX * offX + offY * offY);

			if (distance > 0) {
				if (magnetic) {
					cardTranslateX = (offX / distance) * Math.min(distance * 0.06, 14);
					cardTranslateY = (offY / distance) * Math.min(distance * 0.06, 14);
				}
				if (scale) {
					const activeX = magnetic ? cardTranslateX : offX;
					const activeY = magnetic ? cardTranslateY : offY;
					cardScaleX = Math.max(0.98, 1.02 + Math.abs(activeX) * 0.003 - Math.abs(activeY) * 0.002);
					cardScaleY = Math.max(0.98, 1.02 + Math.abs(activeY) * 0.003 - Math.abs(activeX) * 0.002);
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
		cardRect = null;
		cardTranslateX = 0;
		cardTranslateY = 0;
		cardScaleX = 1;
		cardScaleY = 1;

		if (typeof window !== "undefined") {
			window.removeEventListener("pointermove", handlePointerMoveWindow);
			window.removeEventListener("pointerup", handleRelease);
			window.removeEventListener("pointercancel", handleRelease);
		}
	}

	function handleMouseLeave() {
		if (currentActiveRippleId === null) {
			hoverAngle = null;
			cardTranslateX = 0;
			cardTranslateY = 0;
			cardScaleX = 1;
			cardScaleY = 1;
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

	let transformStyle = $derived.by(() => {
		const parts: string[] = [];
		if (magnetic && (cardTranslateX !== 0 || cardTranslateY !== 0)) {
			parts.push(`translate3d(${cardTranslateX}px, ${cardTranslateY}px, 0)`);
		}
		if (scale && (cardScaleX !== 1 || cardScaleY !== 1)) {
			parts.push(`scale(${cardScaleX}, ${cardScaleY})`);
		}
		return parts.length > 0 ? `transform: ${parts.join(" ")};` : "";
	});

	let cardStyle = $derived(`${style ?? ""}; ${showSpecular ? `--specular-angle: ${activeAngle}deg;` : ""} ${transformStyle}`);
</script>

<div
	bind:this={ref}
	data-slot="card"
	data-size={size}
	class={cn(
		"card-comp relative bg-card text-card-foreground gap-6 overflow-hidden rounded-3xl py-6 text-sm shadow-xs shadow-[inset_0_0_0_1px_var(--border)] has-[>img:first-child]:pt-0 data-[size=sm]:gap-4 data-[size=sm]:py-4 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col",
		(magnetic || scale) && "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
		className,
	)}
	onpointermove={handlePointerMove}
	onpointerdown={handlePointerDown}
	onmouseleave={handleMouseLeave}
	style={cardStyle}
	{...restProps}
>
	{@render children?.()}

	{#if ripple}
		<div class="card-ripple-container">
			{#each ripples as r (r.id)}
				<div use:triggerTransition class="card-ripple" class:is-released={r.isReleased} style="left: {r.x}px; top: {r.y}px; width: {r.size}px; height: {r.size}px;"></div>
			{/each}
		</div>
	{/if}

	{#if showSpecular}
		<div class="card-specular pointer-events-none absolute inset-0 z-20"></div>
	{/if}
</div>

<style>
	@property --specular-angle {
		syntax: "<angle>";
		inherits: true;
		initial-value: -45deg;
	}

	.card-specular {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		padding: 1px;
		background: linear-gradient(var(--specular-angle, -45deg), rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 255, 255, 0.1) 100%);
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

	:global(div[data-slot="card"]:hover) .card-specular {
		transition: none;
	}

	.card-ripple-container {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		border-radius: inherit;
		z-index: 1;
	}

	.card-ripple {
		position: absolute;
		transform: translate(-50%, -50%) scale(0.3);
		opacity: 0;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 70%);
		pointer-events: none;
		mix-blend-mode: plus-lighter;
		filter: blur(24px);
		transition:
			transform 1.4s cubic-bezier(0.1, 0.8, 0.2, 1),
			opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1),
			left 0.15s cubic-bezier(0.25, 1, 0.5, 1),
			top 0.15s cubic-bezier(0.25, 1, 0.5, 1);
	}

	.card-ripple.is-holding {
		transform: translate(-50%, -50%) scale(0.75);
		opacity: 1;
	}

	.card-ripple.is-holding.is-released {
		transform: translate(-50%, -50%) scale(1.6);
		opacity: 0;
		transition:
			transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
			opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}
</style>
