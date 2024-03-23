export default defineEventHandler(async (event) => {
	const { article } = getRouterParams(event)
	const config = useRuntimeConfig()

	const post = await $fetch(config.public.apiBaseUrl, {
		query: {
			query: `
			query getPost {
				nodeByUri(uri: "${article}") {
				  ... on Post {
					featuredImage {
					  node {
						sourceUrl
					  }
					}
					title
					categories {
					  nodes {
						name
					  }
					}
					date
					content
				  }
				}
			  }`,
		},
	})

	if (!post) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Cannot Fetch Page',
		})
	}

	return post.data.nodeByUri
})
