<script setup lang="ts">
const error = useError()

const user = useSupabaseUser()

const handleError = () => {

	if(user.value) {
		clearError({ redirect: '/dashboard' })
	}

	clearError({redirect: '/'})
}

useHead({
	titleTemplate: 'Page Not Found - %s '
})
</script>

<template lang="pug">
div
	NuxtLayout
		section#error.container-fluid.px-0
			.container
				Hero
				UiHeading(:title="error.statusMessage || 'Page Not Found'" align="center" show-description :description="`we’re unable to locate the page you are looking for`" show-button button-text="home" :click="handleError")
</template>