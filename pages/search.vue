<script setup lang="ts">
const query = useRoute().query
const nuxtApp = useNuxtApp()
const url = useRequestURL()
const isOpen = ref(false)

const filters = reactive({
	trip: '',
	location: '',
})

const showModal = () => {
	isOpen.value = !isOpen.value
	updateSearch()
}

const handleClose = () => {
	filters.trip = ''
	filters.location = ''
	isOpen.value = !isOpen.value
}

function updateSearch() {
	if (filters.trip) url.searchParams.set('&trip', filters.trip)
	if (filters.location) url.searchParams.set('&location', filters.location)
	window.history.pushState({}, '', url.toString())
}

const search = computed(
	() =>
		`/api/experiences/search?query=${query.query}${
			query.trip ? `&trip=${query.trip}` : ''
		}${query.location ? `&location=${query.location}` : ''}`
)

const { data: list, error } = await useFetch(search)

useHead({
	titleTemplate: `Search - %s`,
})
</script>

<template lang="pug">
div
	Teleport(to="body")
		DashModal(:is-open="isOpen" :close-modal="showModal")
			UiSearchFilters(@close-modal="handleClose" @save-filter="showModal" :filters="filters")
	section#search-header
		DashSearch(@show-modal="showModal" :filters="filters" :update-search="updateSearch" v-if="$device.isMobile")
		SearchBar(v-else)
		.container.pt-4
			.title(v-if="!Object.keys(query).length") Search Experiences
			.title(v-else-if="list.length") Showing results for '{{ query.query }}'
			.title(v-else) No results for '{{ query.query }}'
			.desc(v-if="$device.isDesktop") showing {{ `${list.length} ${!list.length ? 'result' : 'results'}` }}

	section#search-list.container
		.row 
			.col-sm-4(v-for="item in list" :key="item.title")
				.experience
					NuxtLink(:to="`/experiences/${item.slug}`")
						.photo
							DashDestWrapper(:photo="item.featuredImage.node.sourceUrl")
							.category {{ item.experienceCategories.nodes[0].name }}
							//- .rating.d-flex.align-items-center
								Icon(name="material-symbols:kid-star-sharp" color='white')
								.num 5.0
					.details
						.box.d-flex.align-items-center
							NuxtLink(:to="`/experiences/${item.slug}`")
								.title {{ item.title }}
							.price.ms-auto ${{ item.acfExperiences.price }}
						.location {{ item.acfExperiences.location || 'Accra, Ghana' }}
</template>

<style lang="scss" scoped>
#search-header {
	padding-top: a.$padding-quart;
}

#search-list {
	padding-top: a.$padding-quart;
	padding-bottom: 2.5rem;

	.experience {
		padding-bottom: 1.5rem;

		.photo {
			// background-color: pink;
			aspect-ratio: 16/8;
			border-radius: a.$border-radius;
			position: relative;

			.rating {
				position: absolute;
				bottom: 1rem;
				right: 1rem;
				column-gap: 5px;
				color: white;
			}

			.category {
				position: absolute;
				bottom: 1rem;
				left: 1rem;
				column-gap: 5px;
				color: white;
				border: 1px solid white;
				padding: 0.1rem 1rem;
				font-size: a.$twelve;
			}
		}
		.details {
			padding-top: 1rem;
			position: relative;

			.box {
				width: 80%;
			}

			.title {
				text-transform: capitalize;
				font-weight: 500;
				letter-spacing: normal;
				padding-bottom: 0;
				font-size: 1rem;
			}

			.price {
				font-size: 1.2rem;
				position: absolute;
				font-weight: 900;
				right: 0;
				top: 1rem;
			}

			.location {
				color: rgb(105, 105, 105);
			}
		}
	}
}

@media screen and (min-width: a.$breakpoint-mt) {
	#search-header {
		padding-top: 0;

		.container {
			padding-top: 4rem !important;
		}
	}
}
</style>
