<template lang="pug">
.photo-wrapper
	NuxtImg(:src="photo")
</template>

<script setup lang="ts">
defineProps({
	photo: {
		type: String,
		default: '/error.jpg'
	}
})
</script>