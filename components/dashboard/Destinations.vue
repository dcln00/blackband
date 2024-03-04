<script setup lang="ts">
defineProps(['data', 'pending', 'error', 'searchPending'])
</script>

<template lang="pug">
section#destinations.container
	div(v-if="pending")
		Loading
	div(v-else-if="searchPending") Pending
	div(v-else)
		DashDestination(v-for="item in data" :key="item.title" :title="item.title" :price="item.acfDestinations.price" :category="item.destinationCategories.nodes" :photo="item.featuredImage.node.sourceUrl" :slug="item.slug")
</template>

<style lang="scss" scoped>
section#destinations {
	padding-top: a.$padding;
	padding-bottom: 7rem;
}
</style>