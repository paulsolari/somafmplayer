<template>
	<div class="page-preloader">
		<img src="@/assets/images/preloader-1.svg" alt="Loading..." />
	</div>
</template>

<style scoped lang="scss">
.page-preloader {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background: $background;

	img {
		width: 7.5rem;
		height: 7.5rem;
		filter: drop-shadow(0 0 0.1875rem color-mix(in hsl, hsl(0deg 0% 0%) 20%, transparent));
	}
}
</style>
