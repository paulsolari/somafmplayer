<script setup lang="ts">
import { computed, toRaw } from 'vue';
import { copyObject } from '@/utils';

type Props = {
	name: 'fade';
	group?: boolean;
	css?: boolean;
	type?: 'transition' | 'animation';
	duration?: number | { enter: number; leave: number };
	mode?: 'in-out' | 'out-in' | 'default';
	appear?: boolean;
	enterFromClass?: string;
	enterActiveClass?: string;
	enterToClass?: string;
	appearFromClass?: string;
	appearActiveClass?: string;
	appearToClass?: string;
	leaveFromClass?: string;
	leaveActiveClass?: string;
	leaveToClass?: string;
	tag?: string;
	moveClass?: string;
};

const props = withDefaults(defineProps<Props>(), {
	group: false,
	css: true,
	type: 'transition',
	duration: 1000,
	mode: 'default',
	appear: false,
	tag: undefined,
	moveClass: undefined,
	enterFromClass: undefined,
	enterActiveClass: undefined,
	enterToClass: undefined,
	appearFromClass: undefined,
	appearActiveClass: undefined,
	appearToClass: undefined,
	leaveFromClass: undefined,
	leaveActiveClass: undefined,
	leaveToClass: undefined,
});

const transitionProps = copyObject(toRaw(props), {
	exclude: props.group ? ['group', 'mode'] : ['group', 'tag', 'moveClass'],
});
const transitionDuration = computed(() => `${props.duration}ms`);
</script>

<template>
	<transition-group v-if="props.group" v-bind="transitionProps">
		<slot />
	</transition-group>
	<transition v-else v-bind="transitionProps">
		<slot />
	</transition>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
	transition: opacity v-bind(transitionDuration);
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
