<template lang="pug">
div
	NuxtLayout
		section#error.container-fluid.px-0
			.container
				Hero
				Heading(:title="error.statusMessage" align="center" show-description :description="`we’re unable to locate the page you are looking for`" show-button button-text="home" :click="handleError")
</template>

<script setup lang="ts">
const error = useError()

const handleError = () => clearError({ redirect: '/' })

useHead({
	titleTemplate: 'Page Not Found - %s '
})
</script>