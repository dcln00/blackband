<script setup lang="ts">
defineProps(['title', 'padding'])
</script>

<template lang="pug">
section#dash-title.container(:style="{paddingTop: padding}")
	.title {{ title }}
</template>

<style lang="scss">
#dash-title {
	padding-top: 3rem;

	.title {
		font-size: 1rem;
	}
}
</style>
