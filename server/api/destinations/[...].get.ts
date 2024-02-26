import { Agent } from 'undici'
import crypto from 'node:crypto'

export default defineEventHandler(async (event) => {
	const uri = [...event.node.req.url.split('/')].pop()
	const config = useRuntimeConfig()

	const place = await $fetch(config.public.apiBaseUrl, {
		dispatcher: new Agent({
			connect: {
				rejectUnauthorized: false,
				secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
			},
		}),
		query: {
			query: `
			query getDestination {
				destination(id: "${uri}", idType: SLUG) {
					acfDestinations {
						additionalInfo
						availability
						cancellation
						location
						price
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
