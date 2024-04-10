export default defineEventHandler(async (event) => {
	const {query, trip, location} = getQuery(event)
	const config = useRuntimeConfig()

	const places = await $fetch(config.public.apiBaseUrl, {
		query: {
			query: `
			query getExperiences {
				experiences(
					first: 10,
					where: {taxQuery: {relation: AND, 
						taxArray: [
							${trip ? `{taxonomy: EXPERIENCECATEGORY, field: SLUG, terms: "${trip}", operator: IN},` : ''}
							${location ? `{taxonomy: EXPERIENCECOUNTRY, field: SLUG, terms: "${location}", operator: IN}` : ''}
						]
					}, search:"${query}"}
				) {
				  nodes {
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
						sourceUrl(size: LARGE)
					  }
					}
					acfExperiences {
					  price
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
