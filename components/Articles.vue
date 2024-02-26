<script lang="ts" setup>
const query = computed(() => `/api/posts/articles`);

const { data, error } = await useFetch(query.value);
</script>


<template lang="pug">
section#articles.container
	Heading(title="Featured Travel Articles")
	ErrorBound(v-if="error" message="Cannot Load Featured Articles")
	.row
		Article(v-for="item in data" :title="item.title" :description="trimExcerpt(item.excerpt)" :url="item.uri" :photo="item.featuredImage.node.sourceUrl")
</template>