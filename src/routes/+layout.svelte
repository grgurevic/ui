<script lang="ts">
	import "./layout.css";
	import { ModeWatcher } from "mode-watcher";

	let { children } = $props();
</script>

<ModeWatcher />

<div class="max-w-screen min-h-screen touch-manipulation">
	{@render children()}
</div>
