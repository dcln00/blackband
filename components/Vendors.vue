<script setup lang="ts">
const nuxtApp = useNuxtApp()
const url = computed(() => `/api/vendors/vendors`)

const {
	data: vendors,
	pending,
	error,
} = useLazyFetch(url, {
	key: 'vendors',
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
section#vendors 
	UiHeading(title="view all vendors" align='left')
	Swiper(
		:modules="[SwiperAutoplay, SwiperPagination]"
		:slides-per-view="$device.isMobile ? 1 : 2"
		:space-between="25"
		:autoplay="{delay: 3000, disableOnInteraction: true}"
		:pagination="{enabled: true}"
	)
		SwiperSlide(v-for="item in vendors" :key="item.title")
			NuxtLink(:to="item.vendorsInfo.link" target="_blank")
				.slider 
					PhotoWrapper(:photo='item.featuredImage.node.sourceUrl')
					.details
						.title {{ item.title }}
						.description(v-html="item.content")
		
</template>

<style lang="scss" scoped>
:deep(.swiper) {
	overflow-y: visible;
}

:deep(.swiper-pagination-horizontal) {
	bottom: -30px !important;
	transform: scale(0.6, 0.6);

	.swiper-pagination-bullet-active {
		background-color: #000 !important;
	}
}

#vendors {
	padding-top: calc(a.$padding / 2);
	padding-bottom: a.$padding;

	.slider {
		border-radius: a.$border-radius;
		aspect-ratio: 8/9;
		position: relative;
		overflow: hidden;
		padding: 2rem;

		.details {
			position: absolute;
			width: 90%;
			bottom: 1rem;
			left: 50%;
			transform: translate(-50%, 0);
			color: a.color(white);

			.title, .description {
				text-align: center;

				p {
					margin-bottom: 0 !important;
				}

				a {
					color: a.color(white);
				}
			}
		}
	}
}

@media screen and (min-width: a.$breakpoint-mt) {
	#vendors {
		padding-top: 5rem;
	}
}
</style>
