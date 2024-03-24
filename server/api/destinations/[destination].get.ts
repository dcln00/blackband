export default defineEventHandler(async (event) => {
	const { destination } = getRouterParams(event)
	const config = useRuntimeConfig()

	const place = await $fetch(config.public.apiBaseUrl, {
		query: {
			query: `
			query getDestination {
				destination(id: "${destination}", idType: SLUG) {
					acfDestinations {
						additionalInfo
						availability { from to }
						cancellation
						location
						price
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
				  destinationCategories {
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

	return place.data.destination
})
