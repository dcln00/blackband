<script lang="ts" setup>
const nuxtApp = useNuxtApp()
const { articles } = useRoute().query

const url = computed(() => `/api/posts/articles?articles=${articles}`)

const { data, error, pending, refresh } = await useFetch(url, {
	key: `related-${articles}`,
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
section#related 
	UiHeading(title="Related Articles")
	Swiper(
		:modules="[SwiperAutoplay, SwiperPagination]"
		:slides-per-view="$device.isMobile ? 1 : 3"
		:space-between="25"
		:autoplay="{delay: 3000, disableOnInteraction: true}"
		:pagination="{enabled: true}"
	)
		SwiperSlide(v-for="item in data" :key="item.title")
			.slider
				NuxtLink(:to="`/article${item.uri}`")
					.photo
						NuxtImg(:src="item?.featuredImage?.node?.sourceUrl")
				NuxtLink(:to="`/article${item.uri}`")
					.title {{ item?.title }}
				.description(v-html="trimExcerpt(item?.excerpt, 20)")
				NuxtLink(:to="`/article${item.uri}`")
					button Read More
</template>

<style lang="scss" scoped>
:deep(.swiper) {
	overflow-y: visible;
}

:deep(.swiper-pagination-horizontal) {
	bottom: -40px !important;
	transform: scale(.6, .6);

	.swiper-pagination-bullet-active {
		background-color: #000 !important;
	}
}

#related {
	padding-top: calc(a.$padding / 2);
	padding-bottom: a.$padding;

	.photo {
		border-radius: a.$border-radius;
		margin-bottom: 2rem;
		aspect-ratio: 16/9;
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center center;
		}
	}

	.title {
		text-align: center;
		font-weight: 700;
	}

	.description {
		text-align: center;
	}

	button {
		@include a.button;
		display: block;
		margin: 0 auto;
		padding-top: 0;
	}
}

@media screen and (min-width: a.$breakpoint-mt) {
	.title {
		font-size: 1rem;
	}
}
</style>
