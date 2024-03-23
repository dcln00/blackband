<script setup lang="ts">
const nuxtApp = useNuxtApp()
const url = computed(() => `/api/destinations/places`)

const { data: places, pending, error } = useLazyFetch(url, {
	key: 'destinations', 
	getCachedData: (key) => {
		if (!nuxtApp.isHydrating && nuxtApp.payload.data[key]) {
			return nuxtApp.payload.data[key]
		}

		if (nuxtApp.static.data[key]) {
			return nuxtApp.static.data[key]
		}

		return null
	}
})
</script>

<template lang="pug">
section#destinations.container-fluid.px-0
	UiHeading(title="Destinations" description="Discover Destinations Ideal for a Tailor Made Journey" align='center' show-description)
	Swiper(
		:modules="[SwiperAutoplay]"
		:slides-per-view="1"
		:loop="true"
		:autoplay="{delay: 3000, disableOnInteraction: true}"
	)
		SwiperSlide(v-for="item in places" :key="item.title")
			.slider
				PhotoWrapper(:photo='item.featuredImage.node.sourceUrl')
				UiHeading(:title="item.title" :description="trimExcerpt(item.content, 20)" align='left' :url="`/destinations/${item.slug}`"  show-button buttonText="view" show-description)
</template>

<style lang="scss" scoped>
#destinations {
	padding-bottom: a.$padding;

	.slider {
		aspect-ratio: 1;
		position: relative;
		overflow: hidden;
	
		.heading {
			position: absolute;
			width: 80%;
			bottom: 2.2rem;
			left: 2rem;
			color: a.color(white);
	
			:deep(button) {
				@include a.button;
				color: a.color(white);
				border-bottom: 1px solid a.color(white);
			}
		}
	}
}
</style>