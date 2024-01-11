<script setup lang="ts">
import { onMounted } from 'vue';
import { api } from '@/api';
import AppTransition from '@/components/AppTransition.vue';
import AudioPlayer from '@/components/AudioPlayer.vue';
import ChannelList from '@/components/ChannelList.vue';
import MobileHeader from '@/components/MobileHeader.vue';
import PagePreloader from '@/components/PagePreloader.vue';
import ToggleChannelsButton from '@/components/ToggleChannelsButton.vue';
import { useScreenSize } from '@/composables/screen-size';
import { useMainStore } from '@/stores/main-store';

const mainStore = useMainStore();

const screenSize = useScreenSize();

function hidePagePreloader() {
	setTimeout(() => (mainStore.pageLoading = false), 500);
}

onMounted(async () => {
	mainStore.channels = await api.getChannels();
	hidePagePreloader();
});
</script>

<template>
	<div class="radio-container">
		<AppTransition name="fade">
			<PagePreloader v-if="mainStore.pageLoading" />
		</AppTransition>
		<div class="radio">
			<MobileHeader v-if="screenSize['max-width-sm']" />
			<ToggleChannelsButton v-if="screenSize['max-width-md']" />
			<div class="player" :class="{ 'channels-open': mainStore.mobileChannelsOpen }">
				<ChannelList :data="mainStore.channels" />
				<AudioPlayer />
				<div
					v-if="screenSize['only-width-md']"
					class="mobile-overlay"
					@click="mainStore.mobileChannelsOpen = false"
				></div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.radio-container {
	display: flex;
	flex-wrap: wrap;
	place-content: center;
	height: 100dvh;
}

.radio {
	position: relative;

	@include media(max-width-sm) {
		overflow: hidden;
		width: 100%;
	}

	.player {
		position: relative;
		display: flex;
		place-content: center;
		gap: 1.25rem;
		height: 43.75rem;
		border-radius: $border-radius;
		transition: translate $transition-duration;

		@include media(max-width-lg) {
			height: 39.375rem;
		}

		@include media(max-width-md) {
			overflow: hidden;
			box-shadow: $box-shadow;
		}

		@include media(max-width-sm) {
			flex-direction: row-reverse;
			place-content: flex-start;
			gap: 0;
			overflow: visible;
			width: 100%;
			height: 100vh;
			padding: 3.625rem 0 0;
			border-radius: 0;
			box-shadow: none;
			translate: 100% 0;
		}

		.mobile-overlay {
			position: absolute;
			inset: 0;
			z-index: 19;
			background: color-mix(in hsl, hsl(0deg 0% 0%) 30%, transparent);
			opacity: 0;
			visibility: hidden;
			transition-property: opacity, visibility;
			transition-duration: $transition-duration;
		}

		&.channels-open {
			@include media(max-width-sm) {
				translate: 0;
			}

			.mobile-overlay {
				opacity: 1;
				visibility: visible;
			}
		}
	}
}
</style>
