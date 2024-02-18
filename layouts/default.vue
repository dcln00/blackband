<template lang="pug">
div
	Navigation(v-if="$device.isMobile" :isOpen="isOpen" :close-nav="toggleOpen")
	Header(:toggle-open="toggleOpen")
	main
		slot
	Footer(v-if="!$route.path.includes('login') && !$route.path.includes('signup')")
</template>

<script lang="ts" setup>
const isOpen = ref(false)

function toggleOpen() {
	isOpen.value = !isOpen.value
}
</script>