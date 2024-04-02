<script setup lang="ts">
const nuxtApp = useNuxtApp()
const { slug } = useRoute().params

const url = computed(() => `/api/posts/articles?articles=${slug}`)

const { data, error, pending, refresh, execute } = await useFetch(url, {
	key: `${slug}-articles`,
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

useHead({
	titleTemplate: `${capitalize(slug)} Articles - %s`,
})
</script>

<template lang="pug">
div
	.container(:style="{paddingTop: '2.5rem'}" v-if="$device.isMobile")
		UiHeading(:title="`all about ${slug}`" align="center")
		div.pt-5
			article(v-for="item in data" :key="item?.title")
				NuxtLink(:to='`/article${item?.uri}`')
					.photo
						NuxtImg(:src="item?.featuredImage?.node?.sourceUrl")
				.title {{ item?.title }}
				.description(v-html="trimExcerpt(item?.excerpt)")
				NuxtLink(:to='`/article${item?.uri}`')
					button Read More
	.container-fluid.px-0(v-else)
		.article-heading
			UiHeading(:title="`all about ${slug}`" align="center")
		.container
			article(v-for="item in data" :key="item?.title")
				.row
					.col-5
						NuxtLink(:to='`/article${item?.uri}`')
							.photo
								NuxtImg(:src="item?.featuredImage?.node?.sourceUrl")
					.col-7
						NuxtLink(:to='`/article${item?.uri}`')
							.title {{ item?.title }}
						.description(v-html="trimExcerpt(item?.excerpt)")
						NuxtLink(:to='`/article${item?.uri}`')
							button Read More
</template>

<style lang="scss" scoped>
article {
	padding-bottom: a.$padding;

	.photo {
		aspect-ratio: 16/9;
		border-radius: a.$border-radius;
		margin-bottom: 1rem;
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}

	.title {
		padding-bottom: 0.7rem;
	}

	.description {
		padding-bottom: 0.9rem;
	}

	button {
		@include a.button;
	}
}

@media screen and (min-width: a.$breakpoint-mt) {
	.container-fluid {

		.article-heading {
			background-color: #222222;
			padding: {
				top: 4rem;
				bottom: 3rem;
			}

			:deep(.title) {
				color: a.color(white);
			}
		}
	}

	.container {
		margin-top: 129.783px;
	}
}
</style>
