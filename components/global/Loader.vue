<script setup lang="ts">
const nuxtApp = useNuxtApp()
const isLoading = ref(false)

nuxtApp.hook('page:start', () => {
	isLoading.value = true
})

nuxtApp.hook('page:finish', () => {
	isLoading.value = false
})
</script>

<template lang="pug">
section#loader.container-fluid.d-flex.justify-content-center.align-items-center(v-if="isLoading")
	Icon(name="svg-spinners:bouncing-ball" color="black")
</template>

<style lang="scss">
#loader {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100vh;
	z-index: 100;
	background-color: a.color(white);
}
</style>
