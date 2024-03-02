<script setup>
const { params } = useRoute();

const postUrl = computed(() => `/api/posts/${params.slug}`)
const pageUrl = computed(() => `/api/page/${params.slug}`)
const destUrl = computed(() => `/api/destinations/${params.slug}`)

const { data: posts } = await useFetch(postUrl.value)
const { data: page } = await useFetch(pageUrl.value)
const { data: destination } = await useFetch(destUrl.value)

console.log(posts.value)

useHead({
	titleTemplate: (title) => {
		const pageTitle = params.slug.replace(/-/g, ' ')
		if(params.slug.includes('-')) {
			return `${capitalize(pageTitle)} - ${title}`
		}
		return `${capitalize(params.slug)} - ${title}`
	},
})

definePageMeta({
	validate: async ({ params }) => {
		const parentSlug = ['featured', 'blackband', 'destinations', 'ba', 'packages']
		const validateFind = parentSlug.find(x => x === params.parentSlug)
		if (!validateFind) {
			return createError({
				statusCode: 404,
				message: "Page Not Found",
			});
		}
		return true;
	},
});
</script>

<template lang="pug">
section#pages.container-fluid.px-0
	.container
		Content(:data="page" v-if="page")
		Content(:data="posts" v-else-if="posts")
	Content(:data="destination" v-if="destination")
</template>

<style>
#pages {
	padding-bottom: 5rem;
}
</style>
