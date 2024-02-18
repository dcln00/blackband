import { Agent } from "undici";
import crypto from "node:crypto";

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();

	const article = await $fetch(config.public.apiBaseUrl, {
		dispatcher: new Agent({
			connect: {
				rejectUnauthorized: false,
				secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
			},
		}),
		query: {
			query: `
			query GET_POSTS {
				posts(first:3, where: {categoryName: "featured"}){
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
	});

	if (!article) {
		throw createError({
			statusCode: 500,
			statusMessage: "Cannot Fetch Page",
		});
	}

	return article.data.posts.nodes
});
