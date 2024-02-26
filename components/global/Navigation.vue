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

// const accordion = [
// 	{
// 		title: "Blackband",
// 		items: ["Culture", "Lifestyle", "Business"],
// 		id: 1,
// 	},
// 	{
// 		title: "Culture & Local Experiences",
// 		items: ["Business", "Lifestyle", "Culture"],
// 		id: 2,
// 	},
// 	{
// 		title: "Business & Advisory Services",
// 		items: ["Culture", "Lifestyle", "Business"],
// 		id: 3,
// 	},
// 	{
// 		title: "Packages",
// 		items: ["Culture", "Lifestyle", "Business"],
// 		id: 4,
// 	},
// 	{
// 		title: "Consultancy",
// 		items: ["Culture", "Lifestyle", "Business"],
// 		id: 5,
// 	},
// ];
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
				Accordion
					AccordionItems(v-for="item in accordion" :title="item.title" :handle-show="() => handleShow(item.key)" :show="show" :key="item.title" :selected="selected" :id="item.key")
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
