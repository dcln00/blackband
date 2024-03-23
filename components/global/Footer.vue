<script lang="ts" setup>
const store = useAppNavigation()
</script>

<template lang="pug">
footer.container-fluid
	.container.d-flex.align-items-center
		.logo 
			NuxtImg(src="/logo.png" width="50" height="50")
		.credits
			.copyright {{ store.navigation.subfooter.copyright }}
			.powered {{ store.navigation.subfooter.credits }}
</template>

<style scoped lang="scss">
footer {
	background-color: #f5f5f5;
	padding-top: 2rem;
	padding-bottom: 2rem;
}
</style>