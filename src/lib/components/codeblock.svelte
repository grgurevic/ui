<script lang="ts" module>
	import { createHighlighterCore } from "shiki/core";
	import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

	const highlighter = await createHighlighterCore({
		langs: [import("@shikijs/langs/bash"), import("@shikijs/langs/javascript"), import("@shikijs/langs/typescript"), import("@shikijs/langs/svelte")],
		themes: [import("@shikijs/themes/vesper"), import("@shikijs/themes/github-light")],
		engine: createJavaScriptRegexEngine(),
	});

	interface CodeBlockProps {
		code: Parameters<typeof highlighter.codeToHtml>[0];
		lang?: Parameters<typeof highlighter.codeToHtml>[1]["lang"];
		base?: string;
		background?: string;
		rounded?: string;
		shadow?: string;
		classes?: string;
		preBase?: string;
		prePadding?: string;
		preClasses?: string;
	}
</script>

<script lang="ts">
	import { mode } from "mode-watcher";

	const {
		code = "",
		lang = "txt",
		base = "w-full min-w-0 overflow-hidden",
		rounded = "rounded-container",
		shadow = "",
		classes = "",
		preBase = "",
		prePadding = "[&>pre]:p-4 [&>pre]:overflow-x-auto [&>pre]:max-w-full [&>pre]:w-full",
		preClasses = "",
	}: CodeBlockProps = $props();

	const generatedHtml = $derived(
		highlighter.codeToHtml(code, {
			lang,
			theme: mode.current === "light" ? "github-light" : "vesper",
		}),
	);
</script>

<div class="{base} {rounded} {shadow} {classes} {preBase} {prePadding} {preClasses}">
	<!-- Output Shiki's Generated HTML -->
	{@html generatedHtml}
</div>
