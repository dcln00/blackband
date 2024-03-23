<script setup lang="ts">
defineEmits(['some-event'])
defineProps(['title', 'url', 'external'])
</script>

<template lang="pug">
div
	NuxtLink(:to="url" :external="external")
		.menu-item.d-flex.align-items-center(@click="$emit('someEvent')")
			.title {{ title }}
			.icon.ms-auto #[Icon(name="ph:caret-right-bold")]
	hr
</template>