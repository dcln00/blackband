<template lang="pug">
div.body-outlet
	Loader
	Navigation(v-if="$device.isMobile" :isOpen="isOpen" :close-nav="toggleOpen")
	Header(v-if="$device.isMobile" :toggle-open="toggleOpen")
	AppHeader(v-else)
	main
		slot
	Footer(v-if="$device.isMobile && !$route.path.includes('login') && !$route.path.includes('signup') && $route.params.parentSlug !== 'destinations'")
	AppFooter(v-else-if="!$route.path.includes('login') && !$route.path.includes('signup') && $route.params.parentSlug !== 'destinations'")
</template>

<script lang="ts" setup>
const isOpen = ref(false)

function toggleOpen() {
	isOpen.value = !isOpen.value
}
</script>

<style lang="scss">
.body-outlet {
	min-height: 100vh;
	display: flex;
	flex-direction: column;

	main {
		flex-grow: 1;
	}
}
</style>