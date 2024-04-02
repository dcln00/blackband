<script setup lang="ts">
let show = ref(false)
let selected = ref(null)
defineProps(['isOpen', 'closeNav'])
const store = useAppNavigation()

function handleShow(id: number) {
	show.value = !show.value

	if (selected.value !== id) {
		show.value = true
	}

	selected.value = id
}

const accordion = [
	{
		title: 'BLACKBAND',
		items: ['Culture', 'Lifestyle', 'Business'],
		id: 1,
	},
	{
		title: 'Support',
		items: ['Business', 'Lifestyle', 'Culture'],
		id: 2,
	},
	{
		title: 'Work With Us',
		items: ['Culture', 'Lifestyle', 'Business'],
		id: 3,
	},
]
</script>

<template lang="pug">
footer.container-fluid.px-5
	.row.main-footer 
		.col-md-4.logo-name
			.logo 
				NuxtImg(src="/logo.png" width="70" height="70")
			.name BlackBand
		FooterLinks(v-if="$device.isDesktop")
	hr
	.sub-footer 
		//- .sub-links
		//- 	ul.d-flex(:class="$device.isMobile ? 'flex-column' : ''")
		//- 		NuxtLink(v-for="item in store.navigation.	footer" :key="item.title" :to="item.url")
		//- 			li(@click="closeNav") {{ item.title }}

		.credits 
			.copyright {{ store.navigation.subfooter.copyright }}
			.powered.pt-1 {{ store.navigation.subfooter.credits }}
</template>

<style lang="scss">
footer {
	background: #f5f5f5;
	padding-top: 4.5rem;
	padding-bottom: 4rem;
	font-size: 0.86rem;

	.main-footer {
		padding-bottom: 3rem;
		.logo-name {
			padding-bottom: 1.5rem;

			.name {
				font-weight: 600;
			}
		}
	}

	.sub-footer {
		padding-top: 1rem;

		.sub-links {
			padding-bottom: 1rem;

			ul {
				padding-left: 0;
				column-gap: 10px;

				li {
					list-style-type: none;
					padding-bottom: 1rem;
				}
			}
		}

		.credits {
			.copyright {
				font-size: a.$twelve;
				font-weight: 400;
			}

			.powered {
				@extend .copyright;
			}
		}
	}
}
</style>
