<template lang="pug">
.col-md-4
	article
		NuxtLink(:to='`/featured${url}`')
			.photo
				NuxtImg(:src="photo")
		.title {{ title }}
		.description(v-html="description")
		NuxtLink(:to='`/featured${url}`')
			button Read More
</template>

<script lang="ts" setup>
defineProps(['photo', 'title', 'description', 'url', 'photo'])
</script>

<style lang="scss">
.photo {
	overflow: hidden;
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}
</style>