<script setup lang="ts">
defineProps({
	photo: {
		type: String,
		default: '/error.jpg'
	}
})
</script>

<template lang="pug">
section#hero.container
	.nested
		NuxtImg(:src="photo")
</template>

<style lang="scss" scoped>
#hero {
	padding-top: calc(a.$padding / 2);
	padding-bottom: a.$padding;

	.nested {
		aspect-ratio: 16/9;
		background-color: a.color(black);
		border-radius: a.$border-radius;
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center center;
		}
	}
}
</style>