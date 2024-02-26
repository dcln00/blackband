<script setup lang="ts">
const query = computed(() => `/api/destinations/places`)
const { data, error, pending } = await useLazyFetch(query.value, {
	key: 'destinationList',
})

definePageMeta({
	layout: false,
	middleware: [
		'auth',
	],
})
</script>

<template lang="pug">
div
	NuxtLayout(name="dashboard")
		NuxtPage
</template>
