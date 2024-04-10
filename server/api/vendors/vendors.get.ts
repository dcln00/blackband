export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()

	const vendors = await $fetch(config.public.apiBaseUrl, {
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
					vendorsInfo {
						link
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