<script setup lang="ts">
useHead({
	title: `Blackband - Connecting people to cultural experiences in Africa`,
	meta: [{ name: "description", content: "Blackband" }],
});
</script>

<template lang="pug">
NuxtLayout(v-if="$device.isMobile")
	NuxtPage
div(v-else)
	h1 Coming soon on web
</template>

<style>
@import url("primevue/resources/themes/aura-light-noir/theme.css");
</style>