import { ref } from 'vue';

export interface FetchParams {
	url: string;
	headers?: HeadersInit;
	body?: BodyInit;
	method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
	responseHandler?: 'arrayBuffer' | 'blob' | 'formData' | 'json' | 'text';
}

export async function useFetch<T>({
	url,
	headers,
	body,
	method = 'get',
	responseHandler = 'json',
}: FetchParams): Promise<T> {
	const controller = ref<AbortController>();
	if (controller.value) controller.value.abort();
	controller.value = new AbortController();
	try {
		const response = await fetch(url, {
			headers,
			body,
			method: method.toUpperCase(),
			signal: controller.value.signal,
		});
		if (!response.ok) {
			throw new Error(`Request failed with status ${response.status}`);
		}
		return (await response[responseHandler]()) as T;
	} catch (error) {
		throw new Error(error instanceof Error ? error.message : String(error));
	}
}
