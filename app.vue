<template lang="pug">
NuxtLayout(v-if="$device.isMobile")
	NuxtPage
div(v-else)
	h1 Coming soon on web
</template>

<script setup lang="ts">
useHead({
	title: `Blackband - Connecting people to cultural experiences in Africa`,
	meta: [{ name: "description", content: "Blackband" }],
});
</script>