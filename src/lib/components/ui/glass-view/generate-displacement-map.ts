export interface DisplacementMapOptions {
	width: number;
	height: number;
	borderRadius: number;
	bezelWidth: number;
	refractiveIndex: number;
	surfaceProfile: "circle" | "squircle" | "concave" | "lip";
}

export interface DisplacementMapResult {
	displacementMapDataUri: string;
	specularMapDataUri: string;
}

function canvasToScalableSvgUri(canvas: HTMLCanvasElement): string {
	const pngBase64 = canvas.toDataURL("image/png");
	const w = canvas.width;
	const h = canvas.height;
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="none"><image xlink:href="${pngBase64}" x="0" y="0" width="${w}" height="${h}" preserveAspectRatio="none"/></svg>`;
	return `data:image/svg+xml;base64,${btoa(svg)}`;
}

function roundedRectSDF(px: number, py: number, cx: number, cy: number, hx: number, hy: number, R: number): { dist: number; gx: number; gy: number } {
	const dx = Math.abs(px - cx);
	const dy = Math.abs(py - cy);

	const qx = dx - (hx - R);
	const qy = dy - (hy - R);

	const signX = px >= cx ? 1 : -1;
	const signY = py >= cy ? 1 : -1;

	let dist: number;
	let gx: number;
	let gy: number;

	if (qx > 0 && qy > 0) {
		const len = Math.sqrt(qx * qx + qy * qy);
		dist = R - len;
		if (len > 0.001) {
			gx = (qx / len) * signX;
			gy = (qy / len) * signY;
		} else {
			gx = signX * 0.707;
			gy = signY * 0.707;
		}
	} else if (qx > 0) {
		dist = hx - dx;
		gx = signX;
		gy = 0;
	} else if (qy > 0) {
		dist = hy - dy;
		gx = 0;
		gy = signY;
	} else {
		const distX = hx - dx;
		const distY = hy - dy;
		if (distX < distY) {
			dist = distX;
			gx = signX;
			gy = 0;
		} else {
			dist = distY;
			gx = 0;
			gy = signY;
		}
	}

	return { dist, gx, gy };
}

function smoothInteriorGradient(px: number, py: number, cx: number, cy: number, hx: number, hy: number, blendWidth: number): { gx: number; gy: number; dist: number } {
	const dx = Math.abs(px - cx);
	const dy = Math.abs(py - cy);
	const signX = px >= cx ? 1 : -1;
	const signY = py >= cy ? 1 : -1;

	const distX = hx - dx;
	const distY = hy - dy;

	const diff = distX - distY;

	const h = Math.max(blendWidth - Math.abs(diff), 0.0) / blendWidth;
	const dist = Math.min(distX, distY) - h * h * blendWidth * 0.25;

	const t = 0.5 + (0.5 * diff) / blendWidth;
	const clampedT = Math.max(0, Math.min(1, t));
	const smoothT = clampedT * clampedT * (3 - 2 * clampedT);

	const gx = signX * (1 - smoothT);
	const gy = signY * smoothT;

	const glen = Math.sqrt(gx * gx + gy * gy);
	if (glen > 0.001) {
		return { gx: gx / glen, gy: gy / glen, dist };
	}
	return { gx: signX * 0.707, gy: signY * 0.707, dist };
}

function surfaceProfileCurve(t: number, profile: string): number {
	switch (profile) {
		case "circle": {
			return Math.pow(1 - t, 1.8);
		}
		case "concave": {
			return Math.pow(1 - t, 4.0);
		}
		case "lip": {
			return 0.5 * (1 + Math.cos(t * Math.PI)) * (1 - t);
		}
		default: {
			return Math.pow(1 - t, 3.0);
		}
	}
}

const cache = new Map<string, DisplacementMapResult>();

export function generateDisplacementMap(options: DisplacementMapOptions): DisplacementMapResult {
	const { width, height, borderRadius, bezelWidth = 20, refractiveIndex = 1.5, surfaceProfile = "squircle" } = options;

	const roundedWidth = Math.round(width / 4) * 4;
	const roundedHeight = Math.round(height / 4) * 4;
	const roundedRadius = Math.round(borderRadius / 4) * 4;
	const roundedBezel = Math.round(bezelWidth / 2) * 2;

	const cacheKey = `${roundedWidth}-${roundedHeight}-${roundedRadius}-${roundedBezel}-${refractiveIndex.toFixed(2)}-${surfaceProfile}`;
	if (cache.has(cacheKey)) {
		return cache.get(cacheKey)!;
	}

	const expandedW = roundedWidth * 1.4;
	const expandedH = roundedHeight * 1.4;

	const maxDim = 512;
	const aspect = expandedW / expandedH;
	let mapW: number, mapH: number;
	if (expandedW >= expandedH) {
		mapW = Math.round(Math.min(expandedW, maxDim));
		mapH = Math.round(mapW / aspect);
	} else {
		mapH = Math.round(Math.min(expandedH, maxDim));
		mapW = Math.round(mapH * aspect);
	}

	mapW = Math.round(Math.max(mapW, 4));
	mapH = Math.round(Math.max(mapH, 4));

	const scaleF = mapW / expandedW;
	const scaledBezel = Math.max(1, roundedBezel * scaleF);
	const scaledRadius = roundedRadius * scaleF;

	const dispCanvas = document.createElement("canvas");
	dispCanvas.width = mapW;
	dispCanvas.height = mapH;
	const dispCtx = dispCanvas.getContext("2d");

	const specCanvas = document.createElement("canvas");
	specCanvas.width = mapW;
	specCanvas.height = mapH;
	const specCtx = specCanvas.getContext("2d");

	if (!dispCtx || !specCtx) {
		return {
			displacementMapDataUri: "",
			specularMapDataUri: "",
		};
	}

	const dispImg = dispCtx.createImageData(mapW, mapH);
	const specImg = specCtx.createImageData(mapW, mapH);

	for (let i = 0; i < dispImg.data.length; i += 4) {
		dispImg.data[i] = 128;
		dispImg.data[i + 1] = 128;
		dispImg.data[i + 2] = 128;
		dispImg.data[i + 3] = 255;
	}

	const cx = mapW / 2;
	const cy = mapH / 2;
	const hx = (roundedWidth * scaleF) / 2;
	const hy = (roundedHeight * scaleF) / 2;
	const R = Math.min(scaledRadius, Math.min(hx, hy));

	const refractionStrength = (refractiveIndex - 1.0) * 1.6;

	const minDim = Math.min(roundedWidth, roundedHeight);
	const aspectScaleX = minDim / roundedWidth;
	const aspectScaleY = minDim / roundedHeight;

	const lightAngle = (-Math.PI * 3) / 8;
	const Lx = Math.cos(lightAngle);
	const Ly = Math.sin(lightAngle);
	const Lz = 0.7;
	const Llen = Math.sqrt(Lx * Lx + Ly * Ly + Lz * Lz);
	const normLx = Lx / Llen;
	const normLy = Ly / Llen;
	const normLz = Lz / Llen;

	for (let y = 0; y < mapH; y++) {
		for (let x = 0; x < mapW; x++) {
			const idx = (y * mapW + x) * 4;

			const sdf = roundedRectSDF(x, y, cx, cy, hx, hy, R);
			let { dist } = sdf;
			let { gx, gy } = sdf;

			if (dist > 0) {
				if (dist < scaledBezel && scaledBezel > 0) {
					const px = Math.abs(x - cx);
					const py = Math.abs(y - cy);
					const qx = px - (hx - R);
					const qy = py - (hy - R);

					if (!(qx > 0 && qy > 0)) {
						const smooth = smoothInteriorGradient(x, y, cx, cy, hx, hy, Math.max(4, scaledBezel));
						gx = smooth.gx;
						gy = smooth.gy;
						dist = Math.max(0, smooth.dist);
					}

					const t = Math.min(1, dist / scaledBezel);

					const intensity = surfaceProfileCurve(t, surfaceProfile);

					const ramp = Math.min(1, t * 4.0);
					const edgeFade = ramp * ramp * (3 - 2 * ramp);
					const mag = intensity * refractionStrength * edgeFade;

					const dispX = Math.max(-1, Math.min(1, -gx * mag * aspectScaleX));
					const dispY = Math.max(-1, Math.min(1, -gy * mag * aspectScaleY));

					dispImg.data[idx] = Math.round(128 + 127 * dispX);
					dispImg.data[idx + 1] = Math.round(128 + 127 * dispY);

					const dt = 0.02;
					const t0 = Math.max(0, t - dt);
					const t1 = Math.min(1, t + dt);
					const slope = (surfaceProfileCurve(t1, surfaceProfile) - surfaceProfileCurve(t0, surfaceProfile)) / (t1 - t0);

					const slopeScale = 0.3;
					const Nx = gx * slope * slopeScale;
					const Ny = gy * slope * slopeScale;
					const Nz = 1.0;
					const Nlen = Math.sqrt(Nx * Nx + Ny * Ny + Nz * Nz);

					const dot = (Nx / Nlen) * normLx + (Ny / Nlen) * normLy + (Nz / Nlen) * normLz;

					let highlight = 0;
					if (dot > 0) {
						highlight = Math.pow(dot, 12) * 0.5;
					}

					const rimGlow = Math.pow(1 - t, 4) * 0.25;
					highlight = Math.min(1, highlight + rimGlow);

					let shadow = 0;
					if (dot < 0) {
						shadow = Math.pow(Math.abs(dot), 4) * 0.2;

						shadow = Math.max(0, shadow - rimGlow * 0.6);
					}

					highlight *= edgeFade;
					shadow *= edgeFade;

					if (highlight > shadow) {
						specImg.data[idx] = 255;
						specImg.data[idx + 1] = 255;
						specImg.data[idx + 2] = 255;
						specImg.data[idx + 3] = Math.round(Math.min(255, highlight * 255));
					} else {
						specImg.data[idx] = 0;
						specImg.data[idx + 1] = 0;
						specImg.data[idx + 2] = 0;
						specImg.data[idx + 3] = Math.round(Math.min(255, shadow * 255));
					}
				}
			}
		}
	}

	dispCtx.putImageData(dispImg, 0, 0);
	specCtx.putImageData(specImg, 0, 0);

	const result = {
		displacementMapDataUri: canvasToScalableSvgUri(dispCanvas),
		specularMapDataUri: canvasToScalableSvgUri(specCanvas),
	};

	cache.set(cacheKey, result);
	return result;
}
