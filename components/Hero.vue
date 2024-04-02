<script setup lang="ts">
defineProps({
	photo: {
		type: String,
		default: '/error.jpg'
	},
	title: String,
})
</script>

<template lang="pug">
section#hero(:class="$device.isMobile ? 'container' : 'container-fluid px-0'")
	.nested
		NuxtImg(:src="photo")
		.title(v-if="$device.isDesktop && title") {{ title }}
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
		position: relative;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center center;
		}
	}
}

@media screen and (min-width: a.$breakpoint-mt) {
	#hero {
		padding-top: 0;

		.nested {
			border-radius: 0;
			aspect-ratio: auto;
			height: 70vh;

			.title {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				z-index: 2;
				color: a.color(white);
				background-color: #00000050;
				font-size: 1.5rem;
				padding: 1rem 3rem;
			}
		}
	}
}
</style>