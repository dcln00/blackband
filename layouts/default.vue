<template lang="pug">
div
	Loader
	Navigation(v-if="$device.isMobile" :isOpen="isOpen" :close-nav="toggleOpen")
	Header(v-if="$device.isMobile" :toggle-open="toggleOpen")
	AppHeader(v-else)
	main
		slot
	Footer(v-if="!$route.path.includes('login') && !$route.path.includes('signup') && $route.params.parentSlug !== 'destinations'")
</template>

<script lang="ts" setup>
const isOpen = ref(false)

function toggleOpen() {
	isOpen.value = !isOpen.value
}
</script>