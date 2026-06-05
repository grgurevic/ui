<script lang="ts">
	import "./layout.css";
	import { ModeWatcher } from "mode-watcher";

	let { children } = $props();
</script>

<svelte:head>
	<title>Grgurevic UI - Premium Svelte 5 Components & Liquid Glass</title>
	<meta name="description" content="A premium Svelte 5 component library featuring physics-based elastic cards, specular highlights, and refractive Liquid Glass. Add dynamic SVG glass filters to SvelteKit." />
	<meta name="keywords" content="liquid glass svelte, svelte liquid glass, svelte 5 components, glassmorphism svelte, refractive glass svelte, sveltekit component library, grgurevic ui" />
	
	<!-- OpenGraph -->
	<meta property="og:site_name" content="Grgurevic UI" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Grgurevic UI - Premium Svelte 5 Components & Liquid Glass" />
	<meta property="og:description" content="Premium Svelte 5 component library featuring physics-based elastic cards, specular highlights, and refractive Liquid Glass." />
	<meta property="og:image" content="/logo/pictorial.png" />
	
	<!-- Twitter Cards -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Grgurevic UI - Premium Svelte 5 Components & Liquid Glass" />
	<meta name="twitter:description" content="Premium Svelte 5 component library featuring physics-based elastic cards, specular highlights, and refractive Liquid Glass." />
	<meta name="twitter:image" content="/logo/pictorial.png" />
</svelte:head>

<ModeWatcher />

<div class="max-w-screen min-h-screen touch-manipulation">
	{@render children()}
</div>
