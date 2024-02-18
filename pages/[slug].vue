<template lang="pug">
section#pages.container-fluid.px-0
	.container
		Content(:data="data")
</template>

<script lang="ts" setup>
const {params: { slug }} = useRoute();

const query = computed(() => `/api/page/${slug}`)

const { data, error } = await useFetch(query.value)


if (error.value) {
	throw createError({
		statusCode: 404,
		statusMessage: "Page Not Found",
	});
}

definePageMeta({
	validate: async ({ params }) => {
		if (params.slug !== "about") {
			throw createError({
				statusCode: 404,
				statusMessage: "Page Not Found",
			});
		}

		return true;
	},
});
</script>
