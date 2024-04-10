<script setup lang="ts">
const { params } = useRoute()
const nuxtApp = useNuxtApp()

const postUrl = computed(() => `/api/posts/${params.slug}`)
const pageUrl = computed(() => `/api/page/${params.slug}`)
const expUrl = computed(() => `/api/experiences/${params.slug}`)

const { data: posts, pending: postPending, error } = await useLazyFetch(postUrl.value, {
	key: `featured-${params.slug}`,
	getCachedData: (key) => {
		if (!nuxtApp.isHydrating && nuxtApp.payload.data[key]) {
			return nuxtApp.payload.data[key]
		}

		if (nuxtApp.static.data[key]) {
			return nuxtApp.static.data[key]
		}

		return null
	},
})

const { data: page, pending: pagePending } = await useLazyFetch(pageUrl.value, {
	key: `page-${params.slug}`,
	getCachedData: (key) => {
		if (!nuxtApp.isHydrating && nuxtApp.payload.data[key]) {
			return nuxtApp.payload.data[key]
		}

		if (nuxtApp.static.data[key]) {
			return nuxtApp.static.data[key]
		}

		return null
	},
})

const { data: experience, pending: expPending } = await useLazyFetch(expUrl.value, {
	key: `experience-${params.slug}`,
	getCachedData: (key) => {
		if (!nuxtApp.isHydrating && nuxtApp.payload.data[key]) {
			return nuxtApp.payload.data[key]
		}

		if (nuxtApp.static.data[key]) {
			return nuxtApp.static.data[key]
		}

		return null
	},
	// default: () => defaultDest.value
})

useHead({
	titleTemplate: (title) => {
		const pageTitle = params.slug.replace(/-/g, ' ')
		if (params.slug.includes('-')) {
			return `${capitalize(pageTitle)} - ${title}`
		}
		return `${capitalize(params.slug)} - ${title}`
	},
})

definePageMeta({
	validate: async ({ params }) => {

		const parentSlug = [
			'featured',
			'blackband',
			'experiences',
			'services',
			'packages',
			'articles',
			'article',
		]
		const validateFind = parentSlug.find((x) => x === params.parentSlug)

		if (!validateFind) {
			return createError({
				statusCode: 404,
				message: 'Page Not Found',
			})
		}

		return true
	},
})
</script>

<template lang="pug">
section#pages.container-fluid.px-0
	div(v-if="postPending && pagePending && expPending")
		Loading
	Content(:data="page" v-if="page")
	Content(:data="posts" v-else-if="posts")
	Content(:data="experience" v-else-if="experience")
</template>

<style lang="scss" scoped>
#pages {
	padding-bottom: 1rem;
}
</style>
