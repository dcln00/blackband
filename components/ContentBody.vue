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

	blockquote {
		position: relative;
		text-align: start;
		font-size: 1.2rem;
		font-weight: 200;
		padding-left: 2rem;
		padding-right: 2rem;
		overflow: visible;

		&:before {
			content: open-quote;
			position: absolute;
			top: -70px;
			left: 3px;
			color: rgb(233, 233, 233);
			font-size: 11rem;
			z-index: -1;
		}
	}

	figure {
		margin: 1.5rem 0;
		width: 100%;

		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
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

@media screen and (min-width: a.$breakpoint-mt) {
	#content-body {
		padding-top: a.$padding-half;
		padding-bottom: a.$padding-half;
	}
	.title {
		font-size: 1rem;
	}

	.text {
		font-size: 1rem;

		p {
			line-height: 25px;

			img {
				display: block;
				margin: 0 auto;
				margin-top: 4rem;
				object-fit: contain;
				object-position: center center;
			}
		}
	}
}
</style>
