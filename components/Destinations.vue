<script setup lang="ts">
const nuxtApp = useNuxtApp()
const sliderProps = {
	pagination: {enabled: true},
	navigation: {enabled: true}
}
const url = computed(() => `/api/destinations/places`)

const {
	data: places,
	pending,
	error,
} = useLazyFetch(url, {
	key: 'destinations',
	getCachedData: (key) => {
		if (!nuxtApp.isHydrating && nuxtApp.payload.data[key]) {
			return nuxtApp.payload.data[key]
		}

		if (nuxtApp.static.data[key]) {
			return nuxtApp.static.data[key]
		}

		return null
	},
})
</script>

<template lang="pug">
section#destinations.container-fluid.px-0
	UiHeading(title="Destinations" description="Discover Destinations Ideal for a Tailor Made Journey" align='center' show-description)
	Swiper(
		:modules="$device.isMobile ? [SwiperAutoplay] : [SwiperAutoplay, SwiperPagination, SwiperNavigation]"
		:slides-per-view="1"
		:loop="true"
		:autoplay="{delay: 3000, disableOnInteraction: true}"
		v-bind="$device.isDesktop && sliderProps"
	)
		SwiperSlide(v-for="item in places" :key="item.title")
			.slider(v-if="$device.isMobile")
				PhotoWrapper(:photo='item.featuredImage.node.sourceUrl')
				UiHeading(:title="item.title" :description="trimExcerpt(item.content, 20)" align='left' :url="`/destinations/${item.slug}`"  show-button buttonText="view" show-description)
			.slider.container.d-flex.justify-content-center(v-else)
				.photo
					PhotoWrapper(:photo='item.featuredImage.node.sourceUrl')
				.desc.bg-white
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

@media screen and (min-width: a.$breakpoint-mt) {
	:deep(.swiper) {
		overflow-y: visible;

		.swiper-button-prev {
			color: a.color(black);
			left: 60px;
			transform: scale(0.8, 0.8);
		}

		.swiper-button-next {
			color: a.color(black);
			right: 60px;
			transform: scale(0.8, 0.8);
		}
	}

	:deep(.swiper-pagination-horizontal) {
		bottom: -50px !important;
		transform: scale(0.7, 0.7);

		.swiper-pagination-bullet-active {
			background-color: #000 !important;
		}
	}

	#destinations {
		padding-bottom: a.$padding-full;

		:deep(.heading):first-child {
			.title {
				font-size: 1rem;
			}

			.description {
				padding-bottom: 2rem;
			}
		}

		.slider {
			aspect-ratio: unset;

			.heading {
				color: a.color(black);

				:deep(button) {
					color: a.color(black);
					border-bottom: 1px solid a.color(black);
				}
			}

			.photo {
				position: relative;
				width: 640px;
				aspect-ratio: 1;
			}

			.desc {
				width: 630px;
				padding: 2rem;
				min-height: 320px;
				margin-left: -80px;
				align-self: center;
				position: relative;
			}
		}
	}
}
</style>
