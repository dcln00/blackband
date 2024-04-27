function getYear() {
	return new Date().getFullYear()
}

export const useAppNavigation = defineStore('nav', {
	state: () => ({
		navigation: {
			cards: [
				{
					title: 'Case Studies',
					url: '/case-studies',
				},
				{
					title: 'The Blackbook',
					url: '/blackbook',
				},
				{
					title: 'Vendors',
					url: '/vendors',
				},
			],
			secondary: [
				{
					title: 'Account',
					url: '/dashboard/account',
				},
				{
					title: 'About',
					url: '/about',
				},
				{
					title: 'Contact Us',
					url: '/contact',
				},
			],
			socials: [
				{
					title: 'twitter',
					name: 'fa6-brands:x-twitter',
					url: 'https://www.x.com/blackbandco/'
				},
				{
					title: 'instagram',
					name: 'bi:instagram',
					url: 'https://www.instagram.com/blackbandco/'
				}
			],
			footer: [
				{
					title: 'Privacy Policy',
					url: '/privacy-policy',
				},
				{
					title: 'Terms and conditions',
					url: '/terms',
				},
			],
			subfooter: {
				copyright: `©${getYear()} BlackBand`,
				credits: 'Powered by The Base Network'
			}
		}
	})
})