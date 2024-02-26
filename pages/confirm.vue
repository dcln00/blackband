<script setup lang="ts">
const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
      return navigateTo('dashboard')
  }
}, { immediate: true })

definePageMeta({
 	layout: false,
})
</script>

<template lang="pug">
div Waiting for login...
</template>