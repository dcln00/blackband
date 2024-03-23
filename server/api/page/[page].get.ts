export default defineEventHandler(async (event) => {
	const { page } = getRouterParams(event)
	const config = useRuntimeConfig()

	const pages = await $fetch(config.public.apiBaseUrl, {
		query: {
			query: `
			query getPage {
				page(id: "${page}", idType: URI) {
					title
					content
					featuredImage {
						node {
							sourceUrl
					}
				  }
				  ${page === 'blackband-vendors' ? 'vendorsSettings { showVendors }' : ''}
				  ${
						page === 'business-travel'
							? 'travelSettings { travelExperiences { tabs { title writeUp button{ title } } } }'
							: ''
					}
				  ${
						page === 'leisure-experience'
							? 'leisureSettings { leisureExperiences { tabs { title writeUp button{ title } } } }'
							: ''
					}
				}
			  }`,
		},
	})

	if (!pages) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Cannot Fetch Page',
		})
	}

	return pages.data.page
})
