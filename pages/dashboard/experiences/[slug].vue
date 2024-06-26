<script setup lang="ts">
import FsLightbox from 'fslightbox-vue/v3'
const {
	params: { slug },
} = useRoute()
const nuxtApp = useNuxtApp()
const isOpen = ref(false)
const toggler = ref(false)
const slide = ref(1)

const url = computed(() => `/api/experiences/${slug}`)

const { data, error, pending } = await useFetch(url.value, {
	key: `experiences-${slug}`,
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
	const images = data.value?.acfExperiences?.gallery?.nodes.map(
		(x) => x.sourceUrl
	)
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
			DashBookingForm(:price="data?.acfExperiences?.price" :close-modal="showModal" :data="data")
	section#experience-hero.container-fluid.px-0
		.photo
			.back(@click="navigateTo('/dashboard/experiences')" v-if="$device.isMobile")
				Icon(name="ph:caret-circle-left-fill" color="white" size="2em")
			DashDestWrapper(:photo="data?.featuredImage?.node?.sourceUrl")
	section#exp-heading.container 
		.author {{ data?.author?.node?.name }}
		.title {{ data?.title }}
		.box.d-flex.justify-content-center.align-items-center
			.category {{ data?.experienceCategories?.nodes[0].name }} 
			.bullet •
			.location {{ data?.acfExperiences?.location || 'Accra, Ghana' }}

	.container 
		.row
			.col-sm-8
				section#exp-content.container(v-if="data?.content")
					.title Summary
					.description(v-html="data?.content")
				
				section#exp-content.container(v-if="data?.acfExperiences?.availability.from")
					.title Availability
					.description(v-html="$dayjs(data?.acfExperiences?.availability?.from).format('MMMM DD, YYYY') + ' - ' + $dayjs(data?.acfExperiences?.availability?.to).format('MMMM DD, YYYY')")
				
				section#exp-content.container(v-if="data?.acfExperiences?.cancellation")
					.title Cancellation
					.description(v-html="data?.acfExperiences?.cancellation")

				section#exp-content.container(v-if="data?.acfExperiences?.additionalInfo")
					.title Additional Info
					.description(v-html="data?.acfExperiences?.additionalInfo")

				ClientOnly
					FsLightbox(
						:sources="images()"
						:toggler="toggler"
						type="image"
						:slide="slide"
					)

				section#exp-content.container(v-if="data?.acfExperiences?.gallery?.nodes.length")
					.title Gallery
					.row 
						.col-3.g-3(v-for="(item, ind) in data?.acfExperiences?.gallery?.nodes" :key="ind")
							.image(@click="openCustom(ind + 1)")
								NuxtImg(:src="item.sourceUrl")

				.spacer
			
			.col-sm-4(v-if="$device.isDesktop")
				section#exp-price
					.nested
						.box.d-flex
							.person.me-auto(v-if="data?.acfExperiences?.fromperNight") Priced From
							.price {{ `$${data?.acfExperiences?.price}` }}
							.person.ms-auto(v-if="!data?.acfExperiences?.fromperNight") Per Night
						button(@click="showModal") Book
						button.back(@click="navigateTo('/dashboard/experiences')") Go back

	section#book-bar.container-fluid.px-0(v-if="$device.isMobile")
		.nested.container.d-flex
			.box
				.person(v-if="data?.acfExperiences?.fromperNight") Priced From
				.price {{ `$${data?.acfExperiences?.price}` }}
				.person(v-if="!data?.acfExperiences?.fromperNight") Per Night
			button.ms-auto(@click="showModal") Book
</template>

<style lang="scss" scoped>
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

#experience-hero {
	padding-bottom: a.$padding-half;
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

#exp-heading {
	padding-bottom: a.$padding-half;
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

#exp-content {
	padding-top: a.$padding-half;
	padding-bottom: a.$padding-half;
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

#exp-price {
	position: sticky;
	top: 40.783px;
	margin-bottom: 6rem;
	margin-top: a.$padding-half;
	padding: a.$padding-half;
	padding-bottom: a.$padding-half;
	background-color: #f5f5f5;

	.box {
		padding-bottom: 1rem;
		.price,
		.person {
			font-size: 1rem;
			text-transform: uppercase;
			font-weight: 700;
		}
	}

	button {
		@include a.button;
		width: 100%;
		border: 1px solid black;
		background-color: a.color(black);
		color: a.color(white);
		border-radius: a.$border-radius;
		padding: 0.8rem 2rem;
	}

	button.back {
		margin-top: 1rem;
		background-color: transparent;
		color: a.color(black);
	}
}

.spacer {
	margin-bottom: 6rem;
}

@media screen and (min-width: a.$breakpoint-mt) {
	#experience-hero {
		.photo {
			aspect-ratio: auto;
			height: 75vh;
		}
	}
}
</style>
