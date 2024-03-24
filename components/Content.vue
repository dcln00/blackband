<script lang="ts" setup>
import FsLightbox from "fslightbox-vue/v3"
const user = useSupabaseUser()
const props = defineProps(['data'])
const isOpen = ref(false)
const toggler = ref(false)
const slide = ref(1)
const route = useRoute()
const showModal = () => {
	isOpen.value = !isOpen.value
}

function openCustom(number: number) {
	slide.value = number
	toggler.value = !toggler.value
}

function images() {

	const images = props.data.value?.acfDestinations?.gallery?.nodes.map(x => x.sourceUrl)
	return images
}

// VALIDATE COMPONENTS
const pages = computed(() =>
	route.path === '/privacy-policy' || route.path === '/terms' ? true : false
)

const featuredPosts = computed(() =>
	route.params.parentSlug === 'featured' ? true : false
)

const parentPages = computed(() =>
	route.params.parentSlug !== 'destinations' ? true : false
)

const blackbandTrio = computed(() =>
	route.path === '/blackband-club' || route.path === '/the-blackband-card'
		? true
		: false
)
</script>

<template lang="pug">
div
	//- FEATURED ARTICLES
	div(v-if="featuredPosts")
		FeaturedJumbo(:photo="data?.featuredImage?.node?.sourceUrl" :title="data?.title" :category="data?.categories?.nodes" :date="data?.date")

		ContentBody(v-if="data" :title="data?.title")
			div(v-html="data?.content")

		Newsletter
	
	//- BLACKBAND SERVICES PAGES
	div(v-else-if="blackbandTrio")
		ContentBody(v-if="data" :title="data?.title" :title-style="{paddingTop: '2rem'}")
			div(v-html="data?.content")

		div(v-if="$route.path === '/blackband-club'")
			Cta(button="Become a Member" photo="https://images.unsplash.com/photo-1620511450270-47162b983078?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")

		div(v-if="$route.path === '/the-blackband-card'")
			Cta(button="Get a blackband Card" photo="bbandcard.png")


	//- PAGES WITHOUT HERO
	div(v-else-if="pages")
		ContentBody(v-if="data" :title="data?.title" :title-style="{paddingTop: '2rem'}")
			div(v-html="data?.content")

	//- PAGES W & WO PARENT
	div(v-else-if="parentPages")
		Teleport(to="body")
			DashModal(:is-open="isOpen" :close-modal="showModal")
				.title Book travel services
				UiBusinessTravelForm(:showModal="showModal")

		Hero(:photo="data?.featuredImage?.node?.sourceUrl")

		ContentBody(v-if="data" :title="data?.title")
			div(v-html="data?.content")

			div(v-if="$route.params.slug === 'business-travel'" )
				TravelTabs(:data="data?.travelSettings?.travelExperiences?.tabs" @show-modal="showModal")
				RelatedArticles

			div(v-if="$route.params.slug === 'leisure-experience'" )
				TravelTabs(:data="data?.leisureSettings?.leisureExperiences?.tabs" @show-modal="showModal")
				RelatedArticles

			Vendors(v-if="$route.params.slug === 'blackband-vendors' && data?.vendorsSettings?.showVendors")

	//- DESTINATION PAGE
	div(v-else)
		Teleport(to="body")
			DashModal(:is-open="isOpen" :close-modal="showModal")
				div(v-if='!user')
					.modal-message Login To book
					NuxtLink(:href="`/login?redirectTo=/dashboard/destinations/${data?.slug}`")
						button.book-button login
				DashBookingForm(:price="data?.acfDestinations?.price" :close-modal="showModal" :data="data" v-else)
		section#destination-hero.container-fluid.px-0
			.photo
				.back(@click="$router.go(-1)")
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
				:sources="data?.acfDestinations?.gallery?.nodes.map(x => x.sourceUrl)"
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
.modal-message {
	text-align: center;
	padding-bottom: 1rem;
}

.blackband-buttons {
	@include a.secondary-button;
}

.book-button {
	@include a.button;
	color: a.color(white);
	background-color: a.color(black);
	border-radius: a.$border-radius;
	padding: 0.8rem 2rem;
	display: block;
	width: 100%;
	text-align: center;
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
</style>
