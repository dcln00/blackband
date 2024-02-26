<script setup lang="ts">
defineProps(['title', 'url'])
</script>

<template lang="pug">
div
	NuxtLink(:to="url")
		.menu-item.d-flex.align-items-center
			.title {{ title }}
			.icon.ms-auto #[Icon(name="ph:caret-right-bold")]
	hr
</template>