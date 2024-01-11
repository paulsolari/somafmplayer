<script setup lang="ts">
import AppImage from '@/components/AppImage.vue';
import { useMainStore } from '@/stores/main-store';
import type { Channel } from '@/types';

const props = defineProps<{
	data: Channel;
}>();

const mainStore = useMainStore();

const setCurrentChannel = async () => {
	await mainStore.setCurrentChannel(props.data);
};
</script>

<template>
	<div
		:id="props.data.id"
		class="channel-list-item"
		:class="{ current: props.data.id === mainStore.currentChannel?.id }"
	>
		<div class="inner">
			<AppImage :src="props.data.image" :alt="props.data.id" />
			<div class="info">
				<div class="title">{{ props.data.title }}</div>
				<div class="genre">{{ props.data.genre }}</div>
			</div>
			<button type="button" class="channel-button" @click="setCurrentChannel">Chose channel</button>
		</div>
	</div>
</template>

<style scoped lang="scss">
.channel-list-item {
	min-height: 6.25rem;
	cursor: pointer;

	@include media(max-width-lg) {
		min-height: 5rem;
	}

	@include media(max-width-sm) {
		min-height: 4.375rem;
	}

	&:not(:last-child) {
		border-bottom: 1px solid $color-primary-dark-1;
	}

	@include hover {
		background-color: $color-primary-dark-1;
	}

	&.current {
		background-color: $color-primary-dark-2;
	}

	.inner {
		position: relative;
		display: flex;
		align-items: center;
		overflow: hidden;
		padding: 0.625rem;

		@include media(max-width-lg) {
			padding: 0.9375rem 0.9375rem 1rem;
		}

		@include media(max-width-sm) {
			padding: 0.625rem;
		}
	}

	:deep(.app-image) {
		width: 4.875rem;
		height: 4.875rem;
		border-radius: $border-radius;

		@include media(max-width-lg) {
			width: 3.625rem;
			height: 3.625rem;
		}
	}

	.channel-button {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		font-size: 0;
	}

	.info {
		padding: 0 0 0 1.25rem;
	}

	.title {
		padding: 0 0 0.3125rem;
		font-size: $font-size-lg;
		color: hsl(0deg 0% 100%);

		@include media(max-width-lg) {
			font-size: $font-size-sm;
		}
	}

	.genre {
		font-size: $font-size-sm;
		color: $color-tertiary;
	}
}
</style>
