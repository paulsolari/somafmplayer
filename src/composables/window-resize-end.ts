import { onMounted, onUnmounted } from 'vue';
import { useDebounce } from './debounce.js';

export function useWindowResizeEnd(_function: (_arguments: unknown) => unknown, delay = 100) {
	const debounce = useDebounce(_function, delay);
	onMounted(() => {
		window.addEventListener('resize', debounce);
	});
	onUnmounted(() => {
		window.removeEventListener('resize', debounce);
	});
}
