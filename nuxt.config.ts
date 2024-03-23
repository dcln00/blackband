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
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@use "~/assets/style/abstracts" as a;',
				},
			},
		},
	},
	css: ['bootstrap/dist/css/bootstrap.min.css', '~/assets/style/app.scss'],
	components: [
		{ path: '~/components/dashboard', prefix: 'Dash' },
		{ path: '~/components/ui', prefix: 'Ui' },
		'~/components/global',
		'~/components',
	],
	modules: [
		'@nuxtjs/device',
		'@nuxt/image',
		'nuxt-icon',
		'dayjs-nuxt',
		'@nuxtjs/supabase',
		'nuxt-primevue',
		'@pinia/nuxt',
		'nuxt-swiper',
		'@vueuse/nuxt',
		'@nuxtjs/algolia',
		'nuxt-mail',
	],
	supabase: {
		redirect: false,
	},
	mail: {
		message: {
			to: 'concierge@blackband.co',
		},
		smtp: {
			host: 'smtp.office365.com',
			port: 587,
			auth: {
				user: 'concierge@blackband.co',
				pass: '@bband2050'
			}
		},
	},
	runtimeConfig: {
		public: {
			apiBaseUrl: process.env.API_BASE_URL,
		},
	},
	nitro: { preset: 'vercel' },
})