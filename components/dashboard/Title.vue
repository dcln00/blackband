<script setup lang="ts">
// defineProps(['title', 'padding', 'show'])
defineProps({
	title: String,
	padding: String,
	show: Boolean
})
</script>

<template lang="pug">
section#dash-title.container.d-flex.align-items-center(:style="{paddingTop: padding}")
	.back.pe-4(v-if="show" @click="$router.go(-1)")
		Icon(name="ph:caret-left-bold" size="1.25em")
	.title {{ title }}
</template>

<style lang="scss">
#dash-title {
	padding-top: 3rem;
	padding-bottom: a.$padding;

	.title {
		font-size: 1rem;
		padding-bottom: 0;
	}
}
</style>
