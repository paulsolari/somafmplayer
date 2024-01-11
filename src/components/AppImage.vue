<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core';
import { computed, ref, watch } from 'vue';
import noImage from '@/assets/images/no-image.svg';

type Props = {
	src: string;
	alt: string;
	width?: string | number;
	height?: string | number;
	lazy?: boolean;
	preloader?: string;
	preloaderSizePercent?: number;
	picture?: Array<{
		srcset: string;
		media: string;
		sizes?: string;
		type?: string;
	}>;
};

const props = withDefaults(defineProps<Props>(), {
	width: '',
	height: '',
	lazy: true,
	preloader: 'default',
	preloaderSizePercent: 80,
	picture: () => [],
});

const [DefineTemplate, ReuseTemplate] = createReusableTemplate();

const status = ref<'loading' | 'loaded' | 'error'>('loading');
const isExternal = computed(() => props.src.search(/^https?:\/\//) !== -1);
const imgUrl = computed(() =>
	isExternal.value ? props.src : new URL(`/src/assets/images/${props.src}`, import.meta.url).href,
);
const imgSrc = computed(() => (status.value === 'error' ? noImage : imgUrl.value));
const preloaderSize = computed(() => `${props.preloaderSizePercent}%`);

watch(
	() => props.src,
	() => (status.value = 'loading'),
);
</script>

<template>
	<div class="app-image" :class="[`preloader-${preloader}`]">
		<DefineTemplate>
			<img
				:class="status"
				:src="imgSrc"
				:alt="props.alt"
				:width="props.width"
				:height="props.height"
				:loading="props.lazy ? 'lazy' : 'eager'"
				@load="status !== 'error' ? (status = 'loaded') : ''"
				@error="status = 'error'"
			/>
		</DefineTemplate>
		<picture v-if="props.picture.length > 0">
			<source
				v-for="(source, index) in props.picture"
				:key="index"
				:srcset="source.srcset"
				:sizes="source.sizes"
				:media="source.media"
				:type="source.type"
			/>
			<ReuseTemplate />
		</picture>
		<ReuseTemplate v-else />
	</div>
</template>

<style scoped lang="scss">
.app-image {
	display: flex;
	flex-shrink: 0;
	overflow: hidden;
	width: 100%;
	height: 100%;

	&.preloader-default {
		background: url('@/assets/images/preloader-2.svg') no-repeat center / v-bind(preloaderSize);
	}

	&.preloader-transparent {
		opacity: 0;
	}

	img {
		object-fit: contain;
		width: 100%;
		height: 100%;

		&.loading[loading='lazy'] {
			opacity: 0;
		}
	}
}
</style>
