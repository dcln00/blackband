<script setup lang="ts">
import FsLightbox from "fslightbox-vue/v3"
const { params: { slug } } = useRoute()
const nuxtApp = useNuxtApp()
const isOpen = ref(false)
const toggler = ref(false)
const slide = ref(1)

const url = computed(() => `/api/destinations/${slug}`)

const { data, error, pending } = await useFetch(url.value, {
	key: `destinations-${slug}`,
	getCachedData: (key) => {
		if (!nuxtApp.isHydrating && nuxtApp.payload.data[key]) {
			return nuxtApp.payload.data[key]
		}

		if (nuxtApp.static.data[key]) {
			return nuxtApp.static.data[key]
		}

		return null
	},
})

function openCustom(number: number) {
	slide.value = number
	toggler.value = !toggler.value
}

function images() {

	const images = data.value?.acfDestinations?.gallery?.nodes.map(x => x.sourceUrl)
	return images
}

const showModal = () => {
	isOpen.value = !isOpen.value
}

definePageMeta({
	layout: false,
})
</script>

<template lang="pug">
div
	Teleport(to="body")
		DashModal(:is-open="isOpen" :close-modal="showModal")
			DashBookingForm(:price="data?.acfDestinations?.price" :close-modal="showModal" :data="data")
	section#destination-hero.container-fluid.px-0
		.photo
			.back(@click="navigateTo('/dashboard/destinations')")
				Icon(name="ph:caret-circle-left-fill" color="white" size="2em")
			DashDestWrapper(:photo="data?.featuredImage?.node?.sourceUrl")
	section#dest-heading.container 
		.author {{ data?.author?.node?.name }}
		.title {{ data?.title }}
		.box.d-flex.justify-content-center.align-items-center
			.category {{ data?.destinationCategories?.nodes[0].name }} 
			.bullet •
			.location {{ data?.acfDestinations?.location || 'Accra, Ghana' }}

	section#dest-content.container(v-if="data?.content")
		.title Summary
		.description(v-html="data?.content")
	
	section#dest-content.container(v-if="data?.acfDestinations?.availability.from")
		.title Availability
		.description(v-html="$dayjs(data?.acfDestinations?.availability?.from).format('MMMM DD, YYYY') + ' - ' + $dayjs(data?.acfDestinations?.availability?.to).format('MMMM DD, YYYY')")
	
	section#dest-content.container(v-if="data?.acfDestinations?.cancellation")
		.title Cancellation
		.description(v-html="data?.acfDestinations?.cancellation")

	section#dest-content.container(v-if="data?.acfDestinations?.additionalInfo")
		.title Additional Info
		.description(v-html="data?.acfDestinations?.additionalInfo")

	ClientOnly
		FsLightbox(
			:sources="images()"
			:toggler="toggler"
			type="image"
			:slide="slide"
		)

	section#dest-content.container(v-if="data?.acfDestinations?.gallery?.nodes.length")
		.title Gallery
		.row 
			.col-3.g-3(v-for="(item, ind) in data?.acfDestinations?.gallery?.nodes" :key="ind")
				.image(@click="openCustom(ind + 1)")
					NuxtImg(:src="item.sourceUrl")

	.spacer

	section#book-bar.container-fluid.px-0
		.nested.container.d-flex
			.box
				.price {{ `$${data?.acfDestinations?.price}` }}
				.person Per Person
			button.ms-auto(@click="showModal") Book
</template>

<style lang="scss">
#book-bar {
	position: fixed;
	z-index: 10;
	bottom: 0;
	left: 0;
	padding-top: 5px;
	padding-bottom: 5px;
	background-color: #ededed;
	border-top: 1px solid rgba(128, 128, 128, 0.2);

	.nested {
		.price {
			font-weight: 700;
			font-size: 1.2rem;
		}
		.person {
			font-size: a.$twelve;
		}

		button {
			@include a.button;
			border: 1px solid black;
			background-color: a.color(black);
			color: a.color(white);
			border-radius: a.$border-radius;
			padding: 0.8rem 2rem;
		}
	}
}

#destination-hero {
	padding-bottom: a.$padding;
	.photo {
		aspect-ratio: 16/9;
		position: relative;

		.back {
			position: absolute;
			top: 1rem;
			left: 1rem;
			z-index: 10;
			cursor: pointer;
		}
	}
}

#dest-heading {
	padding-bottom: a.$padding;
	border-bottom: 1px solid #ededed;

	.title {
		text-align: center;
		padding-bottom: 0.5rem;
	}

	.author {
		text-align: center;
		font-size: a.$eight;
		padding-bottom: 0.5rem;
		text-transform: uppercase;
	}

	.box {
		column-gap: 10px;

		.category,
		.location {
			text-transform: uppercase;
			font-size: a.$ten;
			font-weight: 400;
		}
	}
}

#dest-content {
	padding-top: a.$padding;
	padding-bottom: a.$padding;
	border-bottom: 1px solid #ededed;

	.description {
		padding-bottom: 0;
	}

	.image {
		aspect-ratio: 1;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
}

.spacer {
	margin-bottom: 6rem;
}
</style>
