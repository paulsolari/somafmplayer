<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useScreenSize } from '@/composables/screen-size';
// @ts-expect-error audio-visualizer
import { Visualizer } from '@/lib/audio-visualizer';

const props = defineProps<{
	audio: HTMLAudioElement;
}>();

const screenSize = useScreenSize();
const visualizer = ref();
const visualizerElement = ref();
const size = computed(() => (screenSize['max-width-sm'].value ? 1000 : 1500));

watch(size, (value) => {
	/* eslint-disable-next-line */
	visualizer.value.setSize(value, value);
});

onMounted(() => {
	visualizer.value = new Visualizer(props.audio, visualizerElement.value);
	/* eslint-disable-next-line */
	visualizer.value.setSize(size.value, size.value);
});
</script>

<template>
	<canvas ref="visualizerElement" class="audio-player-element-visualizer" />
</template>

<style scoped lang="scss">
.audio-player-element-visualizer {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 0;
	width: 100%;
	height: 100%;
	opacity: 0.7;

	@include media(max-width-sm) {
		top: 50%;
		left: 50%;
		width: 100vw;
		height: 100vw;
		translate: -50% -50%;
	}
}
</style>
