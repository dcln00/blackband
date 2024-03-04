<script setup lang="ts">
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
