<template>
	<div class="app-container">
		<slot />
	</div>
</template>

<style scoped lang="scss">
.app-container {
	overflow: hidden;
	background: $color-primary;
	border: 1px solid $color-primary-dark-1;
	border-radius: $border-radius;
	box-shadow: $box-shadow;

	@include media(max-width-md) {
		box-shadow: none;
	}

	@include media(max-width-sm) {
		border: none;
		border-radius: 0;
	}
}
</style>
