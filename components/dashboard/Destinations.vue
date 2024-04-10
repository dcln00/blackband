<script setup lang="ts">
defineProps(['data', 'pending', 'error', 'searchPending'])
</script>

<template lang="pug">
section#experiences.container
	div(v-if="pending")
		Loading
	div(v-else-if="searchPending") Pending
	.row(v-else)
		.col-sm-4(v-for="item in data" :key="item.title")
			DashDestination(:title="item.title" :price="item.acfExperiences.price" :category="item.experienceCategories.nodes" :photo="item.featuredImage.node.sourceUrl" :slug="item.slug" :location="item.acfExperiences.location")
</template>

<style lang="scss" scoped>
section#experiences {
	padding-top: a.$padding-quart;
	padding-bottom: a.$padding;
}

@media screen and (min-width: a.$breakpoint-mt) {
	section#experiences {
		padding-top: 5rem;
	}
}
</style>