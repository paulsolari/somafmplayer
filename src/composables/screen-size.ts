import { reactive, type Ref } from 'vue';
import mediaQueries from '@/assets/styles/export/_media-queries.module.scss';
import { useMediaQuery } from '@/composables/media-query';

export function useScreenSize() {
	return reactive(
		Object.entries(mediaQueries).reduce(
			(initialValue: Record<string, Ref<boolean>>, [key, value]) => {
				initialValue[key] = useMediaQuery(value);
				return initialValue;
			},
			{},
		),
	);
}
