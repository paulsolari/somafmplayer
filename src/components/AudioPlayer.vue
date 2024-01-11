<script setup lang="ts">
import AppContainer from '@/components/AppContainer.vue';
import AppImage from '@/components/AppImage.vue';
import AppTransition from '@/components/AppTransition.vue';
import AudiPlayerChannelInfo from '@/components/AudioPlayerChannelInfo.vue';
import AudioPlayerElement from '@/components/AudioPlayerElement.vue';
import { useMainStore } from '@/stores/main-store';

const mainStore = useMainStore();
</script>

<template>
	<AppContainer class="audio-player">
		<AppTransition name="fade">
			<div v-if="!mainStore.streamUrl" class="title">
				<h1>SomaFM Radio</h1>
				<h2>somafm.com</h2>
				<h3>Choose a channel</h3>
			</div>
		</AppTransition>
		<AppTransition name="fade">
			<div v-if="mainStore.streamUrl" class="main">
				<AppImage
					class="channel-image"
					:src="mainStore.currentChannel!.xlimage"
					:alt="mainStore.currentChannel!.id"
					:preloader-size-percent="60"
				/>
				<AudiPlayerChannelInfo />
				<AudioPlayerElement :src="mainStore.streamUrl" />
			</div>
		</AppTransition>
	</AppContainer>
</template>

<style scoped lang="scss">
.audio-player {
	position: relative;
	display: flex;
	flex-shrink: 0;
	width: 43.75rem;

	@include media(max-width-lg) {
		width: 39.375rem;
	}

	@include media(max-width-sm) {
		width: 100%;
	}
}

.title {
	position: absolute;
	top: 6.25rem;
	left: 0;
	width: 100%;
	text-align: center;

	h1,
	h2,
	h3 {
		text-shadow: 0.125rem 0.125rem 0 $color-primary-dark-1;
		color: $color-primary-light-1;
	}

	h1 {
		font-size: $font-size-title;
	}

	h2 {
		font-size: $font-size-subtitle;
	}

	h3 {
		margin-top: 5rem;
		font-size: $font-size-title;

		@include media(max-width-sm) {
			margin-top: 2.5rem;
		}
	}

	@include media(max-width-sm) {
		top: 1.25rem;
	}
}

.main {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	padding: 1.25rem;

	.channel-image,
	.preloader {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
	}

	.channel-image {
		width: 100%;
		height: 100%;
		opacity: 0.1;
	}

	.preloader {
		top: 50%;
		left: 50%;
		width: 50%;
		height: 50%;
		translate: -50% -50%;
	}

	@include media(max-width-sm) {
		padding: 0.625rem;
	}
}
</style>
