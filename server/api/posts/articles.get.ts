export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const {articles} = getQuery(event)

	const article = await $fetch(config.public.apiBaseUrl, {
		query: {
			query: `
			query getPosts {
				posts(first:3, where: {categoryName: "${articles || 'featured'}"}){
				  nodes {
					title
					excerpt
					uri
					featuredImage {
					  node {
						sourceUrl
					  }
					}
				  }
				}
			  }`,
		},
	})

	if (!article) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Cannot Fetch Page',
		})
	}

	return article.data.posts.nodes
})
