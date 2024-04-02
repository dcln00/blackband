<script setup lang="ts">
defineProps(['data', 'pending', 'error', 'searchPending'])
</script>

<template lang="pug">
section#destinations.container
	div(v-if="pending")
		Loading
	div(v-else-if="searchPending") Pending
	.row(v-else)
		.col-sm-4(v-for="item in data" :key="item.title")
			DashDestination(:title="item.title" :price="item.acfDestinations.price" :category="item.destinationCategories.nodes" :photo="item.featuredImage.node.sourceUrl" :slug="item.slug" :location="item.acfDestinations.location")
</template>

<style lang="scss" scoped>
section#destinations {
	padding-top: a.$padding;
	padding-bottom: 5rem;
}

@media screen and (min-width: a.$breakpoint-mt) {
	section#destinations {
		padding-top: 5rem;
	}
}
</style>