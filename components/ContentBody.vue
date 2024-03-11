<script setup lang="ts">
defineProps(['title', 'titleStyle'])
</script>

<template lang="pug">
section#content-body.container
	.title(v-if="$route.params.parentSlug !== 'featured'" :style='titleStyle') {{ title }}
	.text
		slot
</template>

<style lang="scss">
.text {
	text-align: justify;

	figure {
		margin: 1.5rem 0;
		width: 100%;
		overflow: hidden;

		img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	}

	

	h1, h2, h3, h4, h5, h6 {
		@include a.title;
		letter-spacing: 0;
		font-size: a.$twelve;
		padding-top: 1rem;
		padding-bottom: 1rem;
	}

	p {
		line-height: 20px;
	}
}
</style>