import { type Ref, ref, toValue, watch } from 'vue';

type Property = string | [string, string];
type Element = Ref<HTMLElement>;

export function useCssVariable(property: Property, element: Element | undefined) {
	element = element ?? ref(document.documentElement);
	const isPropertyArray = Array.isArray(property);
	const variableValue = ref('');
	let initialValue = '';

	watch(
		element,
		() => {
			if (!element?.value) return;
			const computedStyle = getComputedStyle(toValue(element));
			initialValue = computedStyle.getPropertyValue(
				toValue(isPropertyArray ? property[0] : property),
			);
			variableValue.value = isPropertyArray ? toValue(property[1]) : initialValue;
		},
		{ immediate: true },
	);

	watch(variableValue, (newValue) => {
		if (initialValue === newValue) return;
		toValue(element)?.style.setProperty(
			toValue(isPropertyArray ? property[0] : property),
			newValue,
		);
		variableValue.value = newValue;
	});

	return variableValue;
}
