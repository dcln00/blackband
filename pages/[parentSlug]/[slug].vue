<template lang="pug">
section#pages.container-fluid.px-0
	.container
		Content(:data="data")
</template>

<script setup>
const { params } = useRoute();

const query = computed(() => `/api/posts/${params.slug}`)

const { data } = await useFetch(query.value)

definePageMeta({
	validate: async ({ params }) => {
		const parentSlug = ['featured', 'blackband']

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

<style>
#pages {
	padding-bottom: 5rem;
}
</style>
