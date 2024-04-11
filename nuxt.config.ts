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
					content: 'Explore Africa With Greater Confidence',
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
		'@vue-email/nuxt',
	],
	supabase: {
		redirect: false,
	},
	vueEmail: {
		baseUrl: 'https://blackband.vercel.app/',
		autoImport: true,
	},
	runtimeConfig: {
		mailHost: '',
		mailUser: '',
		mailPass: '',
		public: {
			apiBaseUrl: process.env.API_BASE_URL,
		},
	},
	nitro: { preset: 'vercel' },
})
