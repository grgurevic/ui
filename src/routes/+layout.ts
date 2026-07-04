export const prerender = true;
import posthog from "posthog-js";
import { browser } from "$app/environment";
import { env } from "$env/dynamic/public";

const posthogKey = env.PUBLIC_POSTHOG;
const posthogApi = env.PUBLIC_POSTHOG_API;
export const load = async () => {
	if (browser) {
		posthog.init(posthogKey, {
			api_host: posthogApi,
			defaults: "2026-01-30",
		});
	}

	return;
};
