export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()

	const places = await $fetch(config.public.apiBaseUrl, {
		query: {
			query: `
			query getDestinations {
				destinations(first: 10) {
				  nodes {
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
					title
					slug
					featuredImage {
					  node {
						sourceUrl
					  }
					}
					acfDestinations {
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

	return places.data.destinations.nodes
})
