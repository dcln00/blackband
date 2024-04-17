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
        "@vite-pwa/nuxt"
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
					src: 'logo.png',
					sizes: '150x150',
					type: 'image/png',
				},
				{
					src: 'logo.png',
					sizes: '512x512',
					type: 'image/png',
				},
			],
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