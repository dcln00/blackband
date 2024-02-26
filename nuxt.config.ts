export default defineNuxtConfig({
	devtools: { enabled: false },
	app: {
		head: {
			title: 'Blackband',
			meta: [
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1, maximum-scale=1',
				},
				{
					name: 'description',
					content:
						'Embark on an extraordinary journey with Black Band, where we redefine travel in Africa with unwavering confidence',
				},
			],
		},
	},
	css: ['bootstrap/dist/css/bootstrap.min.css', '~/assets/style/app.scss'],
	components: [
		{ path: '~/components/dashboard', prefix: 'Dash' },
		'~/components/global',
		'~/components/ui',
		'~/components',
	],
	modules: ['@nuxtjs/device', '@nuxt/image', 'nuxt-icon', 'dayjs-nuxt', '@nuxtjs/supabase', 'nuxt-primevue', '@pinia/nuxt',],
	supabase: {
		redirect: false,
	},
	runtimeConfig: {
		public: {
			apiBaseUrl: process.env.API_BASE_URL,
		},
	},
	nitro: { preset: 'vercel' },
})
