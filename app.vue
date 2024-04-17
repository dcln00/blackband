<script setup lang="ts">
defineOgImageComponent('WebApp', {
	title: 'BlackBand',
	description: 'Explore Africa With Greater Confidence',
})

useHead({
	htmlAttrs: {
		lang: 'en',
	},
	title: `BlackBand - Explore Africa With Greater Confidence`,
	meta: [
		{ name: 'description', content: 'Visit the BlackBand Website and Explore Africa With Greater Confidence.' },
	],
	link: [
		{
			rel: 'icon',
			href: '/favicon.ico',
		},
	],
})

useSeoMeta({
	ogTitle: 'BlackBand',
	ogDescription: 'Explore Africa With Greater Confidence',
	twitterTitle: 'BlackBand',
	twitterDescription: 'Explore Africa With Greater Confidence',
	twitterCard: 'summary',
})
</script>

<template lang="pug">
NuxtLayout
	NuxtPwaManifest
	NuxtPage
</template>

<style>
@import url('primevue/resources/themes/aura-light-noir/theme.css');
</style>
