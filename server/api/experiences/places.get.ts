export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()

	const places = await $fetch(config.public.apiBaseUrl, {
		query: {
			query: `
			query getExperiences {
				experiences(first: 10) {
				  nodes {
					content
					author {
					  node {
						name
					  }
					}
					experienceCategories {
						nodes {
						  name
						}
					}
					title
					slug
					featuredImage {
					  node {
						sourceUrl
					  }
					}
					acfExperiences {
					  price
					  location
					}
					id
					uri
				  }
				}
			  }`,
		},
	})

	if (!places) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Cannot Fetch Page',
		})
	}

	return places.data.experiences.nodes
})
