<script lang="ts">
	import gsap from "gsap";
	import type { Snippet } from "svelte";
	import { getContext, onMount, tick } from "svelte";
	import { CONTEXT_KEY, type NavigationStackState } from "./context.svelte.js";

	interface Props {
		title?: string;
		leading?: Snippet;
		trailing?: Snippet;
	}

	let { title = "", leading, trailing }: Props = $props();

	const navState = getContext(CONTEXT_KEY) as NavigationStackState | undefined;
	let headerTitleElement = $state<HTMLElement | null>(null);
	let initialStyle = $derived(navState ? "opacity: 0; filter: blur(8px); transform: translate3d(0, 12px, 0);" : "");

	let isInitialized = $state(false);

	onMount(() => {
		tick().then(() => {
			isInitialized = true;
		});
	});

	$effect(() => {
		if (!headerTitleElement) return;

		// Delay execution if inside a context stack to prevent double-render anims on refresh
		if (navState && !isInitialized) return;

		const bigTitleEl = navState?.largeTitleElement;

		if (!bigTitleEl) {
			// Fallback: If no large title is registered in our context, show header title permanently
			gsap.to(headerTitleElement, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.1 });
			return;
		}

		// Initial hidden state for small header title with blur
		gsap.set(headerTitleElement, { opacity: 0, y: 12, filter: "blur(8px)" });

		const observer = new IntersectionObserver(
			([entry]) => {
				const isVisible = entry.isIntersecting;

				if (isVisible) {
					// Small header title fades out
					gsap.to(headerTitleElement, {
						opacity: 0,
						y: 8,
						filter: "blur(8px)",
						duration: 0.28,
						ease: "power2.inOut",
						overwrite: "auto",
					});
					// Big title fades back in
					gsap.to(bigTitleEl, {
						opacity: 1,
						duration: 0.28,
						ease: "power2.inOut",
						overwrite: "auto",
					});
				} else {
					// Small header title fades in
					gsap.to(headerTitleElement, {
						opacity: 1,
						y: 0,
						filter: "blur(0px)",
						duration: 0.28,
						ease: "power3.out",
						overwrite: "auto",
					});
					// Big title fades out cleanly
					gsap.to(bigTitleEl, {
						opacity: 0,
						duration: 0.28,
						ease: "power2.inOut",
						overwrite: "auto",
					});
				}
			},
			{
				threshold: 0,
				rootMargin: "-80px 0px 0px 0px",
			},
		);

		observer.observe(bigTitleEl);

		return () => {
			observer.disconnect();
		};
	});
</script>

<div class="sticky top-0 z-50 flex flex-row justify-between items-center w-full p-6 bg-transparent relative">
	<!-- Progressive Blur Overlay Container -->
	<div class="progressive-blur-container pointer-events-none absolute inset-0 -z-10">
		<div class="blur-filter"></div>
		<div class="blur-filter"></div>
		<div class="blur-filter"></div>
		<div class="blur-filter"></div>
		<div class="blur-filter"></div>
		<div class="blur-filter"></div>
		<div class="blur-filter"></div>
		<div class="gradient"></div>
		<div class="dark-gradient"></div>
	</div>

	{#if leading}
		<div class="relative z-10 flex items-center">{@render leading()}</div>
	{:else}
		<div></div>
	{/if}
	<div class="relative md:absolute md:left-1/2 md:-translate-x-1/2 z-10 flex items-center justify-center">
		<div bind:this={headerTitleElement} class="text-md font-semibold text-foreground" style={initialStyle}>
			{title}
		</div>
	</div>
	{#if trailing}
		<div class="relative z-10 flex items-center">{@render trailing()}</div>
	{:else}
		<div></div>
	{/if}
</div>

<style>
	.progressive-blur-container {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		overflow: hidden;
	}

	.progressive-blur-container > .blur-filter {
		position: absolute;
		inset: 0;
	}

	.progressive-blur-container > .blur-filter:nth-child(1) {
		backdrop-filter: blur(1px);
		mask: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 40%);
		-webkit-mask: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 40%);
	}

	.progressive-blur-container > .blur-filter:nth-child(2) {
		backdrop-filter: blur(2px);
		mask: linear-gradient(to top, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 50%);
		-webkit-mask: linear-gradient(to top, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 50%);
	}

	.progressive-blur-container > .blur-filter:nth-child(3) {
		backdrop-filter: blur(4px);
		mask: linear-gradient(to top, rgba(0, 0, 0, 0) 15%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 60%);
		-webkit-mask: linear-gradient(to top, rgba(0, 0, 0, 0) 15%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 60%);
	}

	.progressive-blur-container > .blur-filter:nth-child(4) {
		backdrop-filter: blur(8px);
		mask: linear-gradient(to top, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 70%);
		-webkit-mask: linear-gradient(to top, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 70%);
	}

	.progressive-blur-container > .blur-filter:nth-child(5) {
		backdrop-filter: blur(16px);
		mask: linear-gradient(to top, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 90%);
		-webkit-mask: linear-gradient(to top, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 90%);
	}

	.progressive-blur-container > .blur-filter:nth-child(6) {
		backdrop-filter: blur(32px);
		mask: linear-gradient(to top, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 90%);
		-webkit-mask: linear-gradient(to top, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 90%);
	}

	.progressive-blur-container > .blur-filter:nth-child(7) {
		backdrop-filter: blur(64px);
		mask: linear-gradient(to top, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 100%);
		-webkit-mask: linear-gradient(to top, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 100%);
	}

	.progressive-blur-container > .gradient {
		position: absolute;
		inset: 0;
		background: linear-gradient(to bottom, var(--background) 0%, transparent 100%);
	}

	.progressive-blur-container > .dark-gradient {
		position: absolute;
		inset: 0;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, transparent 100%);
		transition:
			background 0.3s,
			opacity 0.3s;
	}

	:global(.dark) .progressive-blur-container > .dark-gradient {
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, transparent 100%);
		opacity: 0.95;
	}
</style>
