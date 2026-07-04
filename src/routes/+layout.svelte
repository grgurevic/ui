<script lang="ts">
	import ComponentFooter from "$lib/components/component-footer.svelte";
	import Header from "$lib/components/header.svelte";
	import Sidebar from "$lib/components/sidebar.svelte";
	import "./layout.css";
	import { ModeWatcher } from "mode-watcher";

	let { children } = $props();
</script>

<svelte:head>
	<title>Grgurevic UI - Premium Svelte 5 Components & Liquid Glass</title>
	<meta
		name="description"
		content="A premium Svelte 5 component library featuring physics-based elastic cards, specular highlights, and refractive Liquid Glass. Add dynamic SVG glass filters to SvelteKit."
	/>
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

<ModeWatcher track={true} />

<div class="w-full flex flex-col overflow-x-clip">
	<Header />
	<main class="flex flex-row max-w-6xl w-full mx-auto border">
		<Sidebar />
		<div class="flex-1 min-w-0">
			{@render children()}
			<ComponentFooter />
		</div>
	</main>
</div>
