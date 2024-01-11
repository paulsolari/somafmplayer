<script setup lang="ts">
import { useMainStore } from '@/stores/main-store';

const mainStore = useMainStore();

function toggleChannels() {
	mainStore.mobileChannelsOpen = !mainStore.mobileChannelsOpen;
}
</script>

<template>
	<button
		type="button"
		class="toggle-channels-button"
		:class="mainStore.mobileChannelsOpen ? 'icon-close' : 'icon-menu'"
		@click="toggleChannels"
	>
		Toggle channels
	</button>
</template>

<style scoped lang="scss">
.toggle-channels-button {
	--size: 1.875rem;

	position: absolute;
	top: 0.9375rem;
	right: 1.125rem;
	z-index: 31;
	width: var(--size);
	height: var(--size);
	font-size: 0;
	transition: transform $transition-duration;

	@include media(max-width-sm) {
		position: fixed;
	}

	&::before {
		width: 100%;
		height: 100%;
		font-size: var(--size);
	}
}
</style>
