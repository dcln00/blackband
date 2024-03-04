<script lang="ts" setup>
const query = computed(() => `/api/menu`)

const { data, error } = await useFetch(query.value)

const accordion = flatToHeirarchical(data.value)

let show = ref(false)
let selected = ref(null)
defineProps(['isOpen', 'closeNav'])

function handleShow(id: String) {
	show.value = !show.value
	if (selected.value !== id) {
		show.value = true
	}
	selected.value = id
}

const cards = [
	{
		title: 'The Blackband Club',
		url: '/',
	},
	{
		title: 'Blackband Card',
		url: '/',
	},
	{
		title: 'Blackband Vendors',
		url: '/',
	},
]
</script>

<template lang="pug">
div
	Transition(name="overlay")
		.overlay(v-if="isOpen" @click="closeNav")

	Transition(name="nav")
		nav(v-if="isOpen")
			.navigation-header.d-flex.align-items-center
				NuxtLink(to="/")
					.logo
						NuxtImg(src="/logo.svg" width="40" height="40")
				.closeBtn.ms-auto(@click="closeNav")
					Icon(name="solar:close-square-bold" size='1.5em')
			
			.navigation-body
				UiAccordion(v-for="item in accordion" :title="item.title" :handle-show="() => handleShow(item.key)" :show="show" :key="item.title" :selected="selected" :id="item.key")
					NuxtLink(v-for="item in item.children" :to="`${item?.url}`")
						li(@click="closeNav") {{ item.title }}
			hr
			.navigation-cards
				NavCards(v-for="item in cards" :title="item.title" :url='item.url' :key="item.title")
			hr
			.navigation-footer
				.links
					NuxtLink(to="/dashboard")
						div(@click="closeNav") Account
					NuxtLink(to="/about")
						div(@click="closeNav") About
					div Contact Us
				.sub-links
					ul.d-flex.flex-wrap
						li Cookie Policy 
						li Privacy Policy 
						li Terms of Use 
						li Terms and Conditions
				.socials.d-flex
					Icon(name="fa6-brands:x-twitter" size="1.2em")
					Icon(name='bi:instagram' size="1.2em")
				.credits 
					.copyright © 2024 Blackband
					.powered Powered by The Base Agency
</template>

<style lang="scss" scoped>
nav {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 20;
	background-color: a.color(white);
	height: 100dvh;
	width: 90%;
	padding: 1rem;
	overflow-y: scroll;

	.navigation-body {
		padding-top: 2.5rem;
	}

	.navigation-cards {

		:deep(.nav-card) {
			@include a.button;
			background-color: a.color(black);
			color: a.color(white);
			text-align: center;
			padding: 2rem;
			margin-bottom: 1rem;
		}
	}

	.navigation-footer {

		.links {
			padding-top: 1rem;

			div {
				font-weight: 700;
				text-transform: uppercase;
				font-size: 0.71rem;
				padding-bottom: 1rem;
				text-transform: uppercase;
			}
		}

		.sub-links {
			padding-bottom: 1rem;

			ul {
				padding-left: 0;
				column-gap: 10px;

				li {
					list-style-type: none;
					font-size: .81rem;
					color: gray;
					display: inline-block;
					padding-bottom: 1rem;
				}
			}
		}

		.socials {
			column-gap: 13px;
		}

		.credits {
			padding-top: 1.5rem;

			.copyright {
				font-size: .74rem;
				font-weight: 500;
			}

			.powered {
				@extend .copyright;
			}
		}
	}
}

.overlay {
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(255, 255, 255, 0.5);
	z-index: 1;
	height: 100dvh;
	width: 100%;
}
</style>
