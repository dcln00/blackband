<script setup lang="ts">
let show = ref(false);
let selected = ref(null)
defineProps(['isOpen', 'closeNav'])

function handleShow(id: number) {
	show.value = !show.value;

	if(selected.value !== id) {
		show.value = true
	}

	selected.value = id
}

const accordion = [
	{
		title: "BLACKBAND",
		items: ["Culture", "Lifestyle", "Business"],
		id: 1,
	},
	{
		title: "Support",
		items: ["Business", "Lifestyle", "Culture"],
		id: 2,
	},
	{
		title: "Work With Us",
		items: ["Culture", "Lifestyle", "Business"],
		id: 3,
	}
];
</script>

<template lang="pug">
footer.container-fluid.px-0
	.container
		.row.main-footer 
			.col-md-6.logo-name
				.logo 
					NuxtImg(src="/logo.png" width="50" height="50")
				.name Blackband
			FooterLinks(v-if="$device.isDesktop")
			div(v-else)
				UiAccordion(v-for="item in accordion" :title="item.title" :handle-show="() => handleShow(item.id)" :show="show" :key="item.title" :selected="selected" :id="item.id")
					li(v-for="item in item.items") {{ item }}
		hr
		.sub-footer 
			.sub-links
				ul.d-flex(:class="$device.isMobile ? 'flex-column' : ''")
					NuxtLink(href='#')
						li Cookie Policy 
					NuxtLink(href='#')
						li Privacy Policy 
					li Terms of Use 
					li Terms and Conditions
			
			.credits 
				.copyright © 2024 Blackband
				.powered Powered by The Base Agency
</template>