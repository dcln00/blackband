<template lang="pug">
.col-md-2
	.footer-title Blackband
	.links
		ul
			li #[NuxtLink(to="/experiences") experiences]
			li #[NuxtLink(to="/packages") packages]
.col-md-2
	.footer-title Membership
	.links
		ul
			li #[NuxtLink(to="/blackband-club") The Blackband Club]
			li #[NuxtLink(to="/blackband-books") Blackband Books]
			li #[NuxtLink(to="/blackband-vendors") Blackband Vendors]
.col-md-2
	.footer-title Support
	.links
		ul
			li #[NuxtLink(to="/about") About Us]
			li #[NuxtLink(to="/privacy-policy") Privacy Policy]
			li #[NuxtLink(to="/terms") Terms and Conditions]
			li #[NuxtLink(to="/contact") Contact Us]
.col-md-2
	.footer-title Socials
	.links
		ul
			li #[NuxtLink(to="https://www.instagram.com/blackbandco/") Instagram]
			li #[NuxtLink(to="https://www.x.com/blackbandco/") Twitter]
</template>

<style lang="scss">
.footer-title {
	font-weight: 700;
	text-transform: uppercase;
	font-size: 0.71rem;
	padding-bottom: 1rem;
}

.links {
	ul {
		padding-left: 0;

		li {
			list-style-type: none;
			font-size: a.$twelve;
			padding-bottom: 0.8rem;
			text-transform: capitalize;
		}
	}
}
</style>
