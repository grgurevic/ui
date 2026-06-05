export const prerender = true;
import posthog from "posthog-js";
import { browser } from "$app/environment";
import { PUBLIC_POSTHOG, PUBLIC_POSTHOG_API } from "$env/static/public";
export const load = async () => {
	if (browser) {
		posthog.init(PUBLIC_POSTHOG, {
			api_host: PUBLIC_POSTHOG_API,
			defaults: "2026-01-30",
		});
	}

	return;
};
