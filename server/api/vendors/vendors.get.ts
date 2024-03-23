import { Agent } from 'undici'
import crypto from 'node:crypto'

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()

	const vendors = await $fetch(config.public.apiBaseUrl, {
		dispatcher: new Agent({
			connect: {
				rejectUnauthorized: false,
				secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
			},
		}),
		query: {
			query: `
			query getVendors {
				vendors(first: 10) {
				  nodes {
					title
					content
					featuredImage {
					  node {
						sourceUrl(size: MEDIUM_LARGE)
					  }
					}
				  }
				}
			  }
			`
		}
	})

	if(!vendors) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Cannot Fetch Page',
		})
	}

	return vendors.data.vendors.nodes
})