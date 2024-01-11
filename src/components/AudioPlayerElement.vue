<script setup lang="ts">
import { ref } from 'vue';
import AudioPlayerElementControls from '@/components/AudioPlayerElementControls.vue';
import AudioPlayerElementVisualizer from '@/components/AudioPlayerElementVisualizer.vue';

const props = defineProps<{ src: string }>();

const emit = defineEmits<{
	loadstart: [];
	loadeddata: [];
	canplay: [];
	play: [];
	pause: [];
	waiting: [];
	ended: [];
	error: [];
}>();

const audio = ref<HTMLAudioElement | null>(null);
const isLoaded = ref(false);
const canPlay = ref(false);
const isPlaying = ref(false);
const isWaiting = ref(false);
const volume = ref(1);

async function updatePlayback(event: boolean) {
	if (!audio.value) return;
	event ? audio.value.pause() : await audio.value.play();
}

function updateVolume(event: number) {
	if (audio.value) audio.value.volume = event;
	volume.value = event;
}

const eventListeners = {
	loadstart() {
		isLoaded.value = false;
		canPlay.value = false;
		isPlaying.value = true;
		emit('loadstart');
	},

	loadeddata() {
		isLoaded.value = true;
		emit('loadeddata');
	},

	async canplay() {
		if (!audio.value) return;
		await audio.value.play();
		canPlay.value = true;
		emit('canplay');
	},

	play() {
		isPlaying.value = true;
		emit('play');
	},

	pause() {
		isPlaying.value = false;
		emit('pause');
	},

	waiting() {
		isWaiting.value = false;
		emit('waiting');
	},

	ended() {
		isLoaded.value = false;
		canPlay.value = false;
		isPlaying.value = false;
		emit('ended');
	},

	error(event: Event) {
		isLoaded.value = false;
		canPlay.value = false;
		isPlaying.value = false;
		const target = event.target as HTMLAudioElement;
		const error = target.error;
		emit('error');
		throw new Error(error instanceof Error ? error.message : String(error));
	},
};
</script>

<template>
	<div class="audio-player-element">
		<audio
			v-show="false"
			ref="audio"
			:src="props.src"
			controls
			autoplay
			crossorigin="anonymous"
			v-on="eventListeners"
		></audio>
		<AudioPlayerElementControls
			:is-playing="isPlaying"
			:volume="volume"
			@update:playback="updatePlayback"
			@update:volume="updateVolume"
		/>
		<AudioPlayerElementVisualizer v-if="audio" :audio="audio" />
	</div>
</template>
