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

	let { filterId, displacementMapUri, specularMapUri, width, height, displacementScale = 40, saturationBoost = 1.3, backgroundBlur = 0.3, chromaticAberration = false }: Props = $props();

	// Slight color fringing scaling factors for chromatic aberration
	let rScale = $derived(displacementScale * 0.96);
	let gScale = $derived(displacementScale);
	let bScale = $derived(displacementScale * 1.04);
</script>

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden; pointer-events: none;">
	<defs>
		<filter id={filterId} x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
			{#if backgroundBlur > 0}
				<feGaussianBlur in="SourceGraphic" stdDeviation={backgroundBlur} result="blurred_source" />
			{:else}
				<feOffset in="SourceGraphic" dx="0" dy="0" result="blurred_source" />
			{/if}

			<feImage href={displacementMapUri} x={-0.2 * width} y={-0.2 * height} width={1.4 * width} height={1.4 * height} preserveAspectRatio="none" result="displacement_map" />

			{#if chromaticAberration}
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

				<feDisplacementMap in="red_source" in2="displacement_map" scale={rScale} xChannelSelector="R" yChannelSelector="G" result="red_displaced" />
				<feDisplacementMap in="green_source" in2="displacement_map" scale={gScale} xChannelSelector="R" yChannelSelector="G" result="green_displaced" />
				<feDisplacementMap in="blue_source" in2="displacement_map" scale={bScale} xChannelSelector="R" yChannelSelector="G" result="blue_displaced" />

				<feBlend in="red_displaced" in2="green_displaced" mode="screen" result="rg_blend" />
				<feBlend in="rg_blend" in2="blue_displaced" mode="screen" result="displaced" />
			{:else}
				<feDisplacementMap in="blurred_source" in2="displacement_map" scale={displacementScale} xChannelSelector="R" yChannelSelector="G" result="displaced" />
			{/if}

			{#if saturationBoost !== 1}
				<feColorMatrix type="saturate" values={String(saturationBoost)} in="displaced" result="final" />
			{:else}
				<feOffset in="displaced" dx="0" dy="0" result="final" />
			{/if}
		</filter>
	</defs>
</svg>
