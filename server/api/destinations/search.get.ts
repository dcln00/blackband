import { Agent } from 'undici'
import crypto from 'node:crypto'

export default defineEventHandler(async (event) => {
	const {query, trip, location} = getQuery(event)
	const config = useRuntimeConfig()

	const places = await $fetch(config.public.apiBaseUrl, {
		dispatcher: new Agent({
			connect: {
				rejectUnauthorized: false,
				secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
			},
		}),
		query: {
			query: `
			query getDestinations {
				destinations(
					first: 10,
					where: {taxQuery: {relation: OR, 
						taxArray: [
							${trip ? `{taxonomy: DESTINATIONCATEGORY, field: SLUG, terms: "${trip}", operator: IN},` : ''}
							${trip ? `{taxonomy: DESTINATIONCOUNTRY, field: SLUG, terms: "${location}", operator: IN}` : ''}
						]
					}, search:"${query}"}
				) {
				  nodes {
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
						sourceUrl(size: LARGE)
					  }
					}
					acfDestinations {
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

	return places.data.destinations.nodes
})
