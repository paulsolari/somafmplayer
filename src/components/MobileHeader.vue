<script setup lang="ts">
const name = 'SomaFM Radio';
const link = 'somafm.com';
</script>

<template>
	<div class="mobile-header">
		<div class="title">
			<div class="name">{{ name }}</div>
			<div class="link">{{ link }}</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.mobile-header {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 30;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 0.625rem;
	border-bottom: 1px solid $color-primary-dark-1;

	.title {
		color: hsl(0deg 0% 100%);

		.name {
			font-weight: 700;
			font-size: $font-size-md;
		}

		.link {
			font-size: $font-size-sm;
		}
	}
}
</style>
