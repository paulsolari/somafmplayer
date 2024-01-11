export function useDebounce(_function: (_arguments: unknown) => unknown, delay = 100) {
	let timer: ReturnType<typeof setTimeout>;
	return (..._arguments: Parameters<typeof _function>) => {
		clearTimeout(timer);
		timer = setTimeout(() => _function(..._arguments), delay);
	};
}
