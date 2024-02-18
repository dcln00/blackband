import { Agent } from "undici";
import crypto from "node:crypto";

export default defineEventHandler(async (event) => {
	const uri = [...event.node.req.url.split("/")].pop();
	const config = useRuntimeConfig();

	const page = await $fetch(config.public.apiBaseUrl, {
		dispatcher: new Agent({
			connect: {
				rejectUnauthorized: false,
				secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT,
			},
		}),
		query: {
			query: `
			query getPage {
				page(id: "${uri}", idType: URI) {
					title
					content
					featuredImage {
						node {
							sourceUrl
					}
				  }
				}
			  }`,
		},
	});

	if (!page) {
		throw createError({
			statusCode: 500,
			statusMessage: "Cannot Fetch Page",
		});
	}

	return page.data.page;
});
