export default defineNuxtConfig({
	devtools: { enabled: false },
	app: {
		head: {
			title: "Blackband",
			meta: [
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1, maximum-scale=1",
				},
				{
					name: "description",
					content:
						"Embark on an extraordinary journey with Black Band, where we redefine travel in Africa with unwavering confidence",
				},
			],
		},
	},
	css: ["bootstrap/dist/css/bootstrap.min.css", "~/assets/style/app.scss"],
	components: ["~/components/global", "~/components/ui", "~/components"],
	modules: [
		"@nuxtjs/device",
		"@nuxt/image",
		"nuxt-icon",
		'dayjs-nuxt',
	],
	runtimeConfig: {
		public: {
			apiBaseUrl: 'https://content.blackband.co/graphql',
		},
	},
	nitro: { preset: "vercel" },
});
