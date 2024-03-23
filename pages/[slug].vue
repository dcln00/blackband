<script lang="ts" setup>
const {params: { slug }} = useRoute()
const nuxtApp = useNuxtApp()

const query = computed(() => `/api/page/${slug}`)

const { data, error } = await useFetch(query.value, {
	key: `pages-${query.value}`,
	getCachedData: (key) => {
		if (!nuxtApp.isHydrating && nuxtApp.payload.data[key]) {
			return nuxtApp.payload.data[key]
		}

		if (nuxtApp.static.data[key]) {
			return nuxtApp.static.data[key]
		}

		return null
	}
})

useHead({
	titleTemplate: (title) => {
		// @ts-expect-error
		const pageTitle = slug.replace(/-/g, ' ')

		if(slug.includes('-')) {
			return `${capitalize(pageTitle)} - ${title}`
		}

		return `${capitalize(slug as string)} - ${title}`
	},
})

definePageMeta({
	validate: async ({ params }) => {
		const query = computed(() => `/api/page/${params.slug}`)
		const { data } = await useFetch(query.value)

		if (!data.value) {
			throw createError({
				statusCode: 404,
				statusMessage: "Page Not Found",
			});
		}

		return true;
	},
});
</script>

<template lang="pug">
section#pages.container-fluid.px-0
	Content(:data="data")
</template>