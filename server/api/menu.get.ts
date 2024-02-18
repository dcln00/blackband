import { Agent } from 'undici';
import crypto from 'node:crypto';

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();

	const menu = await $fetch(config.public.apiBaseUrl, {
		dispatcher: new Agent({
			connect: {
			  rejectUnauthorized: false,
			  secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT
			}
		  }),
		query: {
			query: `
			query getMenu {
				menuItems(where: {location: PRIMARY}) {
					nodes {
						key: id
						parentId
						title: label
						url
					}
				}
			}`,
		},
	});

	if(!menu) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Cannot Fetch Menu'
		})
	}

	return menu.data.menuItems.nodes
})
