export default defineEventHandler(async (event) => {
	const { experience } = getRouterParams(event)
	const config = useRuntimeConfig()

	const place = await $fetch(config.public.apiBaseUrl, {
		query: {
			query: `
			query getExperience {
				experience(id: "${experience}", idType: SLUG) {
					acfExperiences {
						additionalInfo
						availability { from to }
						cancellation
						location
						price
						fromperNight
						gallery {
							nodes {
							 sourceUrl
							}
						}
					  }
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
				  id
				  title
				  slug
				  featuredImage {
					node {
					  sourceUrl(size: LARGE)
					}
				  }
				}
			  }`,
		},
	})

	if (!place) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Cannot Fetch Page',
		})
	}

	return place.data.experience
})
