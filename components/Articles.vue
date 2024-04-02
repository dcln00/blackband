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
	}
})
</script>

<template lang="pug">
section#articles.container
	UiHeading(title="Featured Travel Articles")
	.row
		LazyArticle(v-for="item in data" :title="item.title" :description="trimExcerpt(item.excerpt)" :url="item.uri" :photo="item.featuredImage.node.sourceUrl")
</template>

<style scoped lang="scss">
@media screen and (min-width: a.$breakpoint-mt) {
	#articles {
		:deep(.heading) {
			.title {
				font-size: 1rem;
				padding-bottom: 3rem;
				text-align: center;
			}
		}
	}
}
</style>
