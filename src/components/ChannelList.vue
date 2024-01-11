<script setup lang="ts">
import AppContainer from '@/components/AppContainer.vue';
import ChannelListItem from '@/components/ChannelListItem.vue';
import { useMainStore } from '@/stores/main-store';
import type { Channel } from '@/types';

const props = defineProps<{
	data: Channel[];
}>();

const mainStore = useMainStore();
</script>

<template>
	<AppContainer class="channel-list" :class="{ 'channels-open': mainStore.mobileChannelsOpen }">
		<div class="channels">
			<ChannelListItem v-for="channel in props.data" :key="channel.id" :data="channel" />
		</div>
	</AppContainer>
</template>

<style scoped lang="scss">
.channel-list {
	position: relative;
	overflow: hidden;
	width: 25rem;
	height: 100%;

	@include media(max-width-lg) {
		width: 18.75rem;
	}

	@include media(max-width-md) {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 20;
		margin: 0;
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		box-shadow: $box-shadow;
		translate: calc(-100% - 0.3125rem) 0;
		transition: translate $transition-duration;

		&.channels-open {
			translate: 0;
		}
	}

	@include media(max-width-sm) {
		position: relative;
		right: 0;
		flex-shrink: 0;
		width: calc(100% + 1px);
		border-left: 1px solid $color-primary-dark-1;
		border-radius: 0;
		box-shadow: none;
		translate: 0;
	}

	.channels {
		overflow-y: auto;
		height: 100%;
	}
}
</style>
