<script setup lang="ts">
const url = computed(() => `/api/destinations/places`)

const { data: places, pending, error } = useLazyFetch(url)
</script>

<template lang="pug">
section#destinations.container-fluid.px-0
	Heading(title="Destinations" description="Discover Destinations Ideal for a Tailor Made Journey" align='center' show-description)
	Swiper(
		:modules="[SwiperAutoplay]"
		:slides-per-view="1"
		:loop="true"
		:autoplay="{delay: 3000, disableOnInteraction: true}"
	)
		SwiperSlide(v-for="item in places" :key="item.title")
			.slider
				PhotoWrapper(:photo='item.featuredImage.node.sourceUrl')
				Heading(:title="item.title" description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat." align='left' :url="`/destinations/${item.slug}`"  show-button buttonText="view" show-description)
</template>
