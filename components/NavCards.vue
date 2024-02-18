<template lang="pug">
NuxtLink(:to='url')
	.nav-card {{ title }}
</template>

<script setup>
defineProps(['title', 'url'])
</script>