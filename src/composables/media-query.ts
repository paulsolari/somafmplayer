import { onMounted, onUnmounted, ref } from 'vue';

export function useMediaQuery(query: string) {
	const mediaQueryList = matchMedia(query);
	const matches = ref(false);
	const handler = (event: MediaQueryList | MediaQueryListEvent) => {
		matches.value = event.matches;
	};

	onMounted(() => {
		mediaQueryList.addEventListener('change', handler);
		handler(mediaQueryList);
	});

	onUnmounted(() => {
		mediaQueryList.removeEventListener('change', handler);
	});

	return matches;
}
