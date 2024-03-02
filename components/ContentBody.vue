<script setup lang="ts">
defineProps(['title'])
</script>

<template lang="pug">
section#content-body.container
	.title(v-if="$route.params.parentSlug !== 'featured'") {{ title }}
	.text
		slot
</template>

<style lang="scss">
@use '../assets/style/abstracts' as a;
.text {
	text-align: justify;

	figure {
		margin: 2.5rem 0;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	h1, h2, h3, h4, h5, h6 {
		@include a.title;
		letter-spacing: 0;
		font-size: a.$twelve;
	}

	p {
		line-height: 20px;
	}
}
</style>