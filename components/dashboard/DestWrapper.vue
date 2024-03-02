<script setup lang="ts">
defineProps({
	photo: {
		type: String,
		default: '/error.jpg'
	}
})
</script>

<template lang="pug">
.dest-wrapper
	NuxtImg(:src="photo" preload quality="10" loading="lazy" format="webp")
</template>

<style lang="scss">
.dest-wrapper {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height:100%;
	z-index: -1;

	&:after {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.1);
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}
</style>