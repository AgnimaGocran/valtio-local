import { proxy, subscribe } from 'valtio';

export default function persistProxy<T extends object>(defaultValues: T, localStorageKey: string, afterRestored?: (state: T) => void) {
	const state = proxy(defaultValues);

	if (typeof window !== 'undefined') {
		const rawItem = localStorage.getItem(localStorageKey);
		if (rawItem) {
			Object.assign(state, JSON.parse(rawItem) as T);
		}

		subscribe(state, () => {
			localStorage.setItem(localStorageKey, JSON.stringify(state));
		});

		afterRestored(state);
	}

	return state;
};
