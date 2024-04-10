<script setup lang="ts">
const user = useSupabaseUser()
const route = useRoute().query

watch(user, () => {
  if (user.value) {
		if(route.redirectTo) return navigateTo(`${route.redirectTo}`)

		return navigateTo('dashboard/experiences')
  }
}, { immediate: true })

definePageMeta({
 	layout: false,
})
</script>

<template lang="pug">
div Waiting for login...
</template>