<script setup lang="ts">
const mobileNav = [
	{
		name: 'Bookings',
		path: '/dashboard/bookings',
		icon: 'solar:calendar-outline',
	},
	{
		name: 'Experiences',
		path: '/dashboard/experiences',
		icon: 'material-symbols:location-on-outline-rounded',
	},
	/* 
	{
		name: 'Home',
		path: '/dashboard',
		icon: 'teenyicons:home-outline',
	},
	{
		name: 'Reviews',
		path: '/dashboard/reviews',
		icon: 'akar-icons:chat-bubble',
	},
	*/
	{
		name: 'Profile',
		path: '/dashboard/account',
		icon: 'material-symbols:account-circle-full',
	},
]
</script>

<template lang="pug">
#nav.container-fluid.px-0.d-flex.justify-content-around.align-items-center.mobile
	div(v-for="item in mobileNav" :key="item.name")
		NuxtLink(:to='item.path' activeClass='active-dash-link')
			.nav-links.d-flex.align-items-center.flex-column
				Icon(:name="item.icon" size='1.2em')
				p {{ item.name }}
</template>

<style lang="scss">
#nav.mobile {
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 10;
	background-color: a.color(white);
	border-top: 1px solid rgba(128, 128, 128, 0.2);
	padding: {
		top: 1rem;
		bottom: 1rem;
	}

	.active-dash-link {
		color: red;
	}

	p {
		color: gray;
		padding-bottom: 0;
		margin-bottom: 0;
		font-size: a.$ten;
		padding-top: .3rem;
	}

	.nav-links {
		flex: 1 1 0px;
		// width: 30px;
	}
}
</style>
