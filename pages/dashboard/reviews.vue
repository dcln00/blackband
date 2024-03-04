<script setup lang="ts">
const data = ref([])

useHead({
	titleTemplate: `Reviews - %s`,
})
</script>

<template lang="pug">
div 
	DashTitle(title="reviews")
	section#bookings-err.container(v-if="!data.length")
		ErrorBound(message="You have no reviews")
</template>
