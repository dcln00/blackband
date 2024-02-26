<script setup>
defineProps(['title', 'url'])
</script>

<template lang="pug">
NuxtLink(:to='url')
	.nav-card {{ title }}
</template>