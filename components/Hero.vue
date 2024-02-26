<script setup lang="ts">
defineProps({
	photo: {
		type: String,
		default: '/error.jpg'
	}
})
</script>

<template lang="pug">
section#hero
	.nested
		NuxtImg(:src="photo")
</template>