<script setup lang="ts">
defineProps(['data', 'pending', 'error'])
</script>

<template lang="pug">
section#destinations.container
	div(v-if="pending") pending
	div(v-else)
		DashDestination(v-for="item in data" :key="item.title" :title="item.title" :price="item.acfDestinations.price" :category="item.destinationCategories.nodes" :photo="item.featuredImage.node.sourceUrl" :slug="item.slug")
</template>

<style lang="scss">
@use '../../assets/style/abstracts' as a;

section#destinations {
	padding-top: a.$padding;
}
</style>