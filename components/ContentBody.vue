<script setup lang="ts">
defineProps(['title'])
</script>

<template lang="pug">
section#content-body.container
	.title(v-if="$route.params.parentSlug !== 'featured'") {{ title }}
	.text
		slot
</template>

<style lang="scss">
.text {
	text-align: justify;
}
</style>