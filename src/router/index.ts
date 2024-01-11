import { createRouter, createWebHistory } from 'vue-router';
import { useLayout } from './layout-middleware';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: Object.values(import.meta.glob('./routes/*.ts', { import: 'default', eager: true })),
});

router.beforeEach(async (toRoute, fromRoute) => {
	if (fromRoute.name) document.body.classList.remove(`view-${String(fromRoute.name)}`);
	document.body.classList.add(`view-${String(toRoute.name)}`);

	await useLayout(toRoute);
});

export default router;
