export function copyObject(object: Record<string, unknown>, { exclude }: { exclude?: string[] }) {
	const copiedObject = structuredClone(object);
	if (exclude && exclude.length > 0) {
		exclude.forEach((property) => {
			if (copiedObject[property]) delete copiedObject[property];
		});
	}
	return copiedObject;
}
