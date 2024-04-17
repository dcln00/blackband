<script lang="ts" setup>
import FsLightbox from 'fslightbox-vue/v3'
const user = useSupabaseUser()
const props = defineProps(['data'])
const isOpen = ref(false)
const route = useRoute()
const showModal = () => {
	isOpen.value = !isOpen.value
}

// VALIDATE COMPONENTS
const pages = computed(() =>
	route.path === '/privacy-policy' || route.path === '/terms' ? true : false
)

const featuredPosts = computed(() =>
	route.params.parentSlug === 'featured' ? true : false
)

const parentPages = computed(() =>
	route.params.parentSlug !== 'experiences' ? true : false
)

const blackbandTrio = computed(() =>
	route.path === '/blackband-club' || route.path === '/blackband-books'
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
			.row
				.col-sm-2
				.col-sm-8
					div(v-html="data?.content")
				.col-sm-2

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

	//- PAGES W & WO PARENT (article, experiences)
	div(v-else-if="parentPages")
		Teleport(to="body")
			DashModal(:is-open="isOpen" :close-modal="showModal")
				.title Book travel services
				UiBusinessTravelForm(:showModal="showModal")

		Hero(:photo="data?.featuredImage?.node?.sourceUrl" :title="data?.title")

		ContentBody(v-if="data" :title="$device.isMobile ? data?.title : ''")

			.row(v-if="$route.params.parentSlug ==='article'")
				.col-sm-2
				.col-sm-8
					div(v-html="data?.content")
				.col-sm-2

			div(v-html="data?.content" v-else)

			div(v-if="$route.params.slug === 'about'")
				Team(:data="data?.aboutSettings")
				Clients(:data="data?.aboutSettings")

			div(v-if="$route.params.slug === 'business-experience'" )
				TravelTabs(:data="data?.travelSettings?.travelExperiences?.tabs" @show-modal="showModal")
				RelatedArticles

			div(v-if="$route.params.slug === 'leisure-experience'" )
				TravelTabs(:data="data?.leisureSettings?.leisureExperiences?.tabs" @show-modal="showModal")
				RelatedArticles

			Vendors(v-if="$route.params.slug === 'blackband-vendors' && data?.vendorsSettings?.showVendors")
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
		position: relative;
		cursor: pointer;

		.view {
			position: absolute;
			z-index: 2;
			top: 50%;
			left: 50%;
			transform: translate(-50%, 0%);
			transition: 0.5s;
			opacity: 0;
		}

		&:hover > .view {
			opacity: 1;
			transform: translate(-50%, -50%);
			pointer-events: none;
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
}

#exp-price {
	position: sticky;
	top: 129.783px;
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

@media screen and (min-width: a.$breakpoint-mt) {
	#experience-hero {
		.photo {
			aspect-ratio: auto;
			height: 75vh;
		}
	}
}
</style>
