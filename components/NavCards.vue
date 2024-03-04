<script setup>
defineEmits(['closeNav'])
defineProps(['title', 'url'])
</script>

<template lang="pug">
NuxtLink(:to='url' @click="$emit('closeNav')")
	.nav-card {{ title }}
</template>