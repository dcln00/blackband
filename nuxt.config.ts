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
		'@vee-validate/nuxt',
		'nuxt-og-image',
		'@vite-pwa/nuxt',
	],
	ogImage: {
		fonts: ['Jost:400', 'Jost:700'],
	},
	supabase: {
		redirect: false,
	},
	vueEmail: {
		baseUrl: 'https://blackband.vercel.app/',
	},
	veeValidate: {
		autoImports: true,
		componentNames: {
			Form: 'VeeForm',
			Field: 'VeeField',
			FieldArray: 'VeeFieldArray',
			ErrorMessage: 'VeeErrorMessage',
		},
	},
	site: {
		url: 'https://blackband.vercel.app/',
	},
	pwa: {
		manifest: {
			name: 'BlackBand',
			short_name: 'BlackBand',
			description: 'Explore Africa With Greater Confidence',
			theme_color: '#ffffff',
			lang: 'en',
			background_color: '#ffffff',
			icons: [
				{
					src: 'icon_64.png',
					sizes: '64x64',
					type: 'image/png',
				},
				{
					src: 'icon_144.png',
					sizes: '144x144',
					type: 'image/png',
				},
				{
					src: 'icon_150.png',
					sizes: '150x150',
					type: 'image/png',
				},
				{
					src: 'icon_192.png',
					sizes: '192x192',
					type: 'image/png',
				},
				{
					src: 'icon_512.png',
					sizes: '512x512',
					type: 'image/png',
				},
			],
		},
		workbox: {
			navigateFallback: '/',
			runtimeCaching: [{
				urlPattern: ({ url }) => {
					return url.pathname.startsWith("/api")
				},
				handler: 'CacheFirst' as const,
				options: {
					cacheName: 'blackband-cache',
					cacheableResponse: {
						statuses: [0, 200]
					}
				}
			}]
		},
		devOptions: {
			enabled: true,
			type: 'module',
		},
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
