<script lang="ts">
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { onDestroy } from "svelte";
	import { X } from "@lucide/svelte";

	type InputType = Exclude<HTMLInputTypeAttribute, "file">;

	type Props = WithElementRef<Omit<HTMLInputAttributes, "type"> & ({ type: "file"; files?: FileList } | { type?: InputType; files?: undefined })> & {
		specular?: boolean;
		specularAngle?: number;
		scale?: boolean;
		magnetic?: boolean;
		ripple?: boolean;
		clearButton?: boolean;
		unstyled?: boolean;
	};

	let {
		ref = $bindable(null),
		value = $bindable(),
		type,
		files = $bindable(),
		class: className,
		"data-slot": dataSlot = "input",
		specular = true,
		specularAngle = undefined,
		scale = true,
		magnetic = true,
		ripple = true,
		clearButton = false,
		unstyled = false,
		style,
		liquidGlass = true,
		refractiveIndex = 1.5,
		bezelWidth = 24,
		displacementScale = 40,
		surfaceProfile = "squircle",
		chromaticAberration = false,
		saturationBoost = 1.3,
		backgroundBlur = 0.3,
		...restProps
	}: Props & {
		liquidGlass?: boolean;
		refractiveIndex?: number;
		bezelWidth?: number;
		displacementScale?: number;
		surfaceProfile?: "circle" | "squircle" | "concave" | "lip";
		chromaticAberration?: boolean;
		saturationBoost?: number;
		backgroundBlur?: number;
		unstyled?: boolean;
	} = $props();

	import { createLiquidGlass, LiquidGlassFilter } from "$lib/components/ui/glass-view/index.js";

	const lgState = createLiquidGlass(() => ({
		liquidGlass: unstyled ? false : liquidGlass,
		refractiveIndex,
		bezelWidth,
		displacementScale,
		surfaceProfile,
		chromaticAberration,
		saturationBoost,
		backgroundBlur,
	}));

	let wrapperRef = $state<HTMLElement | null>(null);

	$effect(() => {
		lgState.ref = wrapperRef;
	});

	let hoverAngle = $state<number | null>(null);
	let ripples = $state<{ id: number; x: number; y: number; size: number; isReleased: boolean }[]>([]);
	let nextRippleId = 0;
	let currentActiveRippleId = $state<number | null>(null);
	let isDraggingInput = $state(false);

	let inputTranslateX = $state(0);
	let inputTranslateY = $state(0);
	let inputScaleX = $state(1);
	let inputScaleY = $state(1);
	let inputRect = $state<DOMRect | null>(null);

	function handlePointerMove(e: PointerEvent) {
		if (currentActiveRippleId !== null || isDraggingInput) return;
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

		if (ripple && currentActiveRippleId !== null) {
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
		isDraggingInput = true;

		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		if (ripple) {
			const size = Math.max(rect.width, rect.height) * 2.5;
			const id = nextRippleId++;
			const newRipple = { id, x, y, size, isReleased: false };
			ripples.push(newRipple);
			currentActiveRippleId = id;
		}

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
		if (ripple) {
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
		}

		currentActiveRippleId = null;
		isDraggingInput = false;
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
		if (currentActiveRippleId === null && !isDraggingInput) {
			hoverAngle = null;
		}
	}

	function handleClear(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		value = "";
		if (files !== undefined) {
			files = undefined;
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
		if (!isDraggingInput && currentActiveRippleId === null) return [];
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

	let inputStyle = $derived(`${style ?? ""}; ${showSpecular ? `--specular-angle: ${activeAngle}deg;` : ""} ${transformStyle}; ${lgState.backdropStyle}`);
</script>

{#if unstyled}
	{#if type === "file"}
		<input
			bind:this={ref}
			data-slot={dataSlot}
			class={cn("outline-none focus:outline-none", className)}
			type="file"
			bind:files
			bind:value
			{...restProps}
		/>
	{:else}
		<input
			bind:this={ref}
			data-slot={dataSlot}
			class={cn("outline-none focus:outline-none", className)}
			{type}
			bind:value
			{...restProps}
		/>
	{/if}
{:else if type === "file"}
	<div
		bind:this={wrapperRef}
		class={cn(
			"input-wrapper relative w-full inline-flex rounded-md overflow-hidden border border-black/5 dark:border-white/10 shadow-xs",
			liquidGlass ? "bg-muted/30 liquid-glass-active" : "bg-muted/60",
			"has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[[data-slot][aria-invalid=true]]:ring-3",
			className
		)}
		role="presentation"
		onpointermove={handlePointerMove}
		onpointerdown={handlePointerDown}
		onmouseleave={handleMouseLeave}
		style={inputStyle}
	>
		<div class="ripple-container">
			{#each ripples as ripple (ripple.id)}
				<div use:triggerTransition class="ripple" class:is-released={ripple.isReleased} style="left: {ripple.x}px; top: {ripple.y}px; width: {ripple.size}px; height: {ripple.size}px;"></div>
			{/each}
		</div>
		<input
			bind:this={ref}
			data-slot={dataSlot}
			class={cn(
				"bg-transparent border-0 ring-0 focus:ring-0 focus:outline-none focus:border-0 h-9 px-2.5 py-1 text-base file:h-7 file:text-sm file:font-medium md:text-sm file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 relative z-10",
				clearButton && value ? "pr-9" : ""
			)}
			type="file"
			bind:files
			bind:value
			{...restProps}
		/>
		{#if showSpecular}
			<div class="input-specular pointer-events-none absolute inset-0 rounded-md z-20"></div>
		{/if}
		{#if clearButton && value}
			<button
				type="button"
				tabindex="-1"
				onpointerdown={handleClear}
				class="absolute right-3 top-1/2 -translate-y-1/2 size-4.5 rounded-full flex items-center justify-center bg-foreground/10 hover:bg-foreground/20 active:bg-foreground/30 text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer pointer-events-auto z-30 focus:outline-none"
				aria-label="Clear input"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="size-2.5 stroke-[2.5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		{/if}
	</div>
{:else}
	<div
		bind:this={wrapperRef}
		class={cn(
			"input-wrapper relative w-full inline-flex rounded-full overflow-hidden border border-black/5 dark:border-white/10 shadow-xs",
			liquidGlass ? "bg-muted/30 liquid-glass-active" : "bg-muted/60",
			"has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[[data-slot][aria-invalid=true]]:ring-3",
			className
		)}
		role="presentation"
		onpointermove={handlePointerMove}
		onpointerdown={handlePointerDown}
		onmouseleave={handleMouseLeave}
		style={inputStyle}
	>
		<div class="ripple-container">
			{#each ripples as ripple (ripple.id)}
				<div use:triggerTransition class="ripple" class:is-released={ripple.isReleased} style="left: {ripple.x}px; top: {ripple.y}px; width: {ripple.size}px; height: {ripple.size}px;"></div>
			{/each}
		</div>
		<input
			bind:this={ref}
			data-slot={dataSlot}
			class={cn(
				"bg-transparent border-0 ring-0 focus:ring-0 focus:outline-none focus:border-0 h-10 px-3 text-base file:h-7 file:text-sm file:font-medium md:text-sm file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 relative z-10",
				clearButton && value ? "pr-9" : ""
			)}
			{type}
			bind:value
			{...restProps}
		/>
		{#if showSpecular}
			<div class="input-specular pointer-events-none absolute inset-0 rounded-full z-20"></div>
		{/if}
		{#if clearButton && value}
			<button
				type="button"
				tabindex="-1"
				onmousedown={handleClear}
				class="absolute right-3.5 top-1/2 -translate-y-1/2 size-3.5 rounded-full flex items-center justify-center text-muted-foreground transition-all duration-200 cursor-pointer pointer-events-auto z-30 focus:outline-none"
				aria-label="Clear input"
			>
				<X />
			</button>
		{/if}
	</div>
{/if}

{#if liquidGlass && lgState.isChromium && lgState.displacementMapUri}
	<LiquidGlassFilter
		filterId={lgState.filterId}
		displacementMapUri={lgState.displacementMapUri}
		specularMapUri={lgState.specularMapUri}
		width={lgState.width}
		height={lgState.height}
		{displacementScale}
		{saturationBoost}
		{backgroundBlur}
		{chromaticAberration}
	/>
{/if}

<style>
	@property --specular-angle {
		syntax: "<angle>";
		inherits: true;
		initial-value: -45deg;
	}

	.input-wrapper {
		transition:
			transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
			background-color 0.2s,
			border-color 0.2s,
			box-shadow 0.2s;
		transform: translate3d(0, 0, 0);
	}

	.input-specular {
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

	.input-wrapper:hover .input-specular,
	.input-wrapper:focus-within .input-specular {
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
