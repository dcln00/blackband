import { Agent } from "undici";
import crypto from "node:crypto";

export default defineEventHandler(async (event) => {
	const uri = [...event.node.req.url.split("/")].pop();
	const config = useRuntimeConfig();

	const post = await $fetch(config.public.apiBaseUrl, {
		dispatcher: new Agent({
			connect: {
				rejectUnauthorized: false,
				secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
			},
		}),
		query: {
			query: `
			query getPost {
				nodeByUri(uri: "${uri}") {
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
	});

	if (!post) {
		throw createError({
			statusCode: 500,
			statusMessage: "Cannot Fetch Page",
		});
	}

	return post.data.nodeByUri;
});
