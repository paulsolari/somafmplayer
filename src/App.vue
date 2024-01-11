<template>
	<RouterView v-slot="{ Component, route }">
		<component :is="route.meta.layoutComponent">
			<component :is="Component" />
		</component>
	</RouterView>
</template>
