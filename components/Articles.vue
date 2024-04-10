<script lang="ts" setup>
const nuxtApp = useNuxtApp()
const query = computed(() => `/api/posts/articles`)

const { data, error, pending, refresh } = await useFetch(query.value, {
	key: 'articles',
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
section#articles.container
	UiHeading(title="Featured Blackband Articles")
	.row
		LazyArticle(v-for="item in data" :title="item.title" :description="trimExcerpt(item.excerpt, 25)" :url="item.uri" :photo="item.featuredImage.node.sourceUrl")
</template>

<style scoped lang="scss">
#articles {
	padding-bottom: 1rem;

	:deep(article) {
		padding-bottom: a.$padding;

		.photo {
			aspect-ratio: 16/9;
			background-color: a.color(black);
			border-radius: a.$border-radius;
			margin-bottom: 1rem;
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
}

@media screen and (min-width: a.$breakpoint-mt) {
	#articles {
		:deep(.heading) {
			.title {
				font-size: 1rem;
				text-align: center;
			}
		}
	}
}
</style>
