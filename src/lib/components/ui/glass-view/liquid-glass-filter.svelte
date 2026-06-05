<script lang="ts">
	interface Props {
		filterId: string;
		displacementMapUri: string;
		specularMapUri: string;
		width: number;
		height: number;
		displacementScale?: number;
		saturationBoost?: number;
		backgroundBlur?: number;
		chromaticAberration?: boolean;
	}

	let {
		filterId,
		displacementMapUri,
		specularMapUri,
		width,
		height,
		displacementScale = 40,
		saturationBoost = 1.3,
		backgroundBlur = 0.3,
		chromaticAberration = false
	}: Props = $props();

	// Slight color fringing scaling factors for chromatic aberration
	let rScale = $derived(displacementScale * 0.96);
	let gScale = $derived(displacementScale);
	let bScale = $derived(displacementScale * 1.04);
</script>

<!--
	The SVG is placed in the DOM but hidden. backdrop-filter: url(#id)
	references the filter by fragment ID — the SVG just needs to exist
	somewhere in the document.
-->
<svg
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	aria-hidden="true"
	style="position: absolute; width: 0; height: 0; overflow: hidden; pointer-events: none;"
>
	<defs>
		<!--
			color-interpolation-filters="sRGB" ensures vivid colors.
			filterUnits="objectBoundingBox" makes filter region relative to
			the element the filter is applied to.
			Default primitiveUnits is "userSpaceOnUse" (pixel coordinates).
		-->
		<filter
			id={filterId}
			x="-20%"
			y="-20%"
			width="140%"
			height="140%"
			filterUnits="objectBoundingBox"
			primitiveUnits="userSpaceOnUse"
			color-interpolation-filters="sRGB"
		>
			<!-- 1. Background Blur (if specified) -->
			{#if backgroundBlur > 0}
				<feGaussianBlur
					in="SourceGraphic"
					stdDeviation={backgroundBlur}
					result="blurred_source"
				/>
			{:else}
				<feOffset in="SourceGraphic" dx="0" dy="0" result="blurred_source" />
			{/if}

			<!--
				2. Load the displacement map.
				The displacement map is placed exactly on the element's boundaries
				(which is shifted to 14.2857% offset and occupies 71.4285% width/height
				of the expanded 140% filter region).
			-->
			<feImage
				href={displacementMapUri}
				x={-0.2 * width}
				y={-0.2 * height}
				width={1.4 * width}
				height={1.4 * height}
				preserveAspectRatio="none"
				result="displacement_map"
			/>

			<!-- 3. Displacement Pass (with/without Chromatic Aberration) -->
			{#if chromaticAberration}
				<!-- Split into R, G, B channels -->
				<feColorMatrix
					type="matrix"
					values="
						1 0 0 0 0
						0 0 0 0 0
						0 0 0 0 0
						0 0 0 1 0"
					in="blurred_source"
					result="red_source"
				/>
				<feColorMatrix
					type="matrix"
					values="
						0 0 0 0 0
						0 1 0 0 0
						0 0 0 0 0
						0 0 0 1 0"
					in="blurred_source"
					result="green_source"
				/>
				<feColorMatrix
					type="matrix"
					values="
						0 0 0 0 0
						0 0 0 0 0
						0 0 1 0 0
						0 0 0 1 0"
					in="blurred_source"
					result="blue_source"
				/>

				<!-- Displace each channel by slightly different scale values -->
				<feDisplacementMap
					in="red_source"
					in2="displacement_map"
					scale={rScale}
					xChannelSelector="R"
					yChannelSelector="G"
					result="red_displaced"
				/>
				<feDisplacementMap
					in="green_source"
					in2="displacement_map"
					scale={gScale}
					xChannelSelector="R"
					yChannelSelector="G"
					result="green_displaced"
				/>
				<feDisplacementMap
					in="blue_source"
					in2="displacement_map"
					scale={bScale}
					xChannelSelector="R"
					yChannelSelector="G"
					result="blue_displaced"
				/>

				<!-- Recombine channels via screen mode blend -->
				<feBlend in="red_displaced" in2="green_displaced" mode="screen" result="rg_blend" />
				<feBlend in="rg_blend" in2="blue_displaced" mode="screen" result="displaced" />
			{:else}
				<!-- Standard displacement mapping -->
				<feDisplacementMap
					in="blurred_source"
					in2="displacement_map"
					scale={displacementScale}
					xChannelSelector="R"
					yChannelSelector="G"
					result="displaced"
				/>
			{/if}

			<!-- 4. Saturation Boost -->
			{#if saturationBoost !== 1}
				<feColorMatrix
					type="saturate"
					values={String(saturationBoost)}
					in="displaced"
					result="final"
				/>
			{:else}
				<feOffset in="displaced" dx="0" dy="0" result="final" />
			{/if}
		</filter>
	</defs>
</svg>
