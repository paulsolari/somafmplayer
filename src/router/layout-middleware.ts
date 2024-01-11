import type { ModuleNamespace } from 'vite/types/hot.js';
import { type RouteLocation } from 'vue-router';
// https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
export async function useLayout(route: RouteLocation) {
	try {
		const layoutName = (route.meta.layout as string) || 'Default';
		const layoutComponent = (await import(`@/layouts/${layoutName}.vue`)) as ModuleNamespace;
		if (!layoutComponent.default) {
			throw new Error(`The layout named '${layoutName}' does not exist`);
		}
		route.meta.layoutComponent = layoutComponent.default;
	} catch (error) {
		throw new Error(error instanceof Error ? error.message : String(error));
	}
}
