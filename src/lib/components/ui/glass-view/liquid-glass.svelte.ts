import { generateDisplacementMap } from "./generate-displacement-map.js";

export interface LiquidGlassProps {
	liquidGlass?: boolean;
	refractiveIndex?: number;
	bezelWidth?: number;
	displacementScale?: number;
	surfaceProfile?: "circle" | "squircle" | "concave" | "lip";
	chromaticAberration?: boolean;
	saturationBoost?: number;
	backgroundBlur?: number;
}

export function createLiquidGlass(propsGetter: () => LiquidGlassProps) {
	let ref = $state<HTMLElement | null>(null);
	let width = $state(0);
	let height = $state(0);
	let borderRadius = $state(0);
	let displacementMapUri = $state("");
	let specularMapUri = $state("");
	let isChromium = $state(false);

	const uniqueToken = Math.random().toString(36).substring(2, 9);
	let filterId = $derived(
		width > 0 && height > 0
			? `liquid-glass-filter-${uniqueToken}-${Math.round(width)}-${Math.round(height)}`
			: `liquid-glass-filter-${uniqueToken}-init`
	);
	let frameId: number | null = null;

	function triggerGeneration() {
		const props = propsGetter();
		if (!props.liquidGlass || typeof window === "undefined" || width <= 0 || height <= 0) return;

		if (frameId !== null) cancelAnimationFrame(frameId);
		frameId = requestAnimationFrame(() => {
			const result = generateDisplacementMap({
				width,
				height,
				borderRadius,
				bezelWidth: props.bezelWidth ?? 20,
				refractiveIndex: props.refractiveIndex ?? 1.5,
				surfaceProfile: props.surfaceProfile ?? "squircle",
			});
			displacementMapUri = result.displacementMapDataUri;
			specularMapUri = result.specularMapDataUri;
			frameId = null;
		});
	}

	$effect(() => {
		isChromium = typeof window !== "undefined" && !!(window as any).chrome;
	});

	$effect(() => {
		const el = ref;
		const props = propsGetter();
		if (!props.liquidGlass || !el) return;

		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const rect = entry.contentRect;
				width = el.clientWidth || rect.width;
				height = el.clientHeight || rect.height;

				const computedStyle = window.getComputedStyle(el);
				const computedRadius = computedStyle.borderRadius;
				const match = computedRadius.match(/(\d+(?:\.\d+)?)/);
				borderRadius = match ? parseFloat(match[1]) : 0;

				triggerGeneration();
			}
		});

		observer.observe(el);

		return () => {
			observer.disconnect();
			if (frameId !== null) cancelAnimationFrame(frameId);
		};
	});

	$effect(() => {
		const props = propsGetter();
		const _lg = props.liquidGlass;
		const _ri = props.refractiveIndex;
		const _bw = props.bezelWidth;
		const _sp = props.surfaceProfile;

		triggerGeneration();
	});

	let backdropStyle = $derived.by(() => {
		const props = propsGetter();
		if (props.liquidGlass && isChromium && displacementMapUri) {
			const blurVal = props.backgroundBlur ?? 0.3;
			return `backdrop-filter: url(#${filterId}) blur(${blurVal}px); -webkit-backdrop-filter: url(#${filterId}) blur(${blurVal}px);`;
		}
		return "";
	});

	return {
		get ref() { return ref; },
		set ref(val) { ref = val; },
		get filterId() { return filterId; },
		get isChromium() { return isChromium; },
		get displacementMapUri() { return displacementMapUri; },
		get specularMapUri() { return specularMapUri; },
		get backdropStyle() { return backdropStyle; },
		get width() { return width; },
		get height() { return height; },
	};
}
