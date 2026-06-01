export class NavigationStackState {
	largeTitleElement = $state<HTMLElement | null>(null);

	registerLargeTitle(el: HTMLElement) {
		this.largeTitleElement = el;
	}

	unregisterLargeTitle() {
		this.largeTitleElement = null;
	}
}

export const CONTEXT_KEY = Symbol("navigation-stack");
