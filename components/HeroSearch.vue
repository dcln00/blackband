<script lang="ts" setup>
const route = useRoute()
const searchQuery = ref('')
const isOpen = ref(false)
const url = useRequestURL()

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

const updateSearch = () => {
	url.searchParams.set('query', searchQuery.value)
	if (filters.trip) url.searchParams.set('&trip', filters.trip)
	if (filters.location) url.searchParams.set('&location', filters.location)
	window.history.pushState({}, '', url.toString())
}

const handleSubmit = () => {
	if (!searchQuery.value) return

	navigateTo(
		`/search?query=${searchQuery.value}${
			filters.trip ? `&trip=${filters.trip}` : ''
		}${filters.location ? `&location=${filters.location}` : ''}`
	)
}

// const filtersCat = [
// 	{
// 		icon: 'lucide:palmtree',
// 		label: 'Experiences',
// 	},
// 	{
// 		icon: 'mingcute:bus-2-line',
// 		label: 'tours',
// 	},
// 	{
// 		icon: 'lucide:party-popper',
// 		label: 'Detty December',
// 	},
// ]
</script>

<template lang="pug">
div
	Teleport(to="body")
		DashModal(:is-open="isOpen" :close-modal="showModal")
			UiSearchFilters(@close-modal="handleClose" @save-filter="showModal" :filters="filters")

	section#herosearch(:class="$device.isMobile ? 'container' : 'container-fluid px-0'")
		.nested(:class="$device.isDesktop ? 'd-flex align-items-center justify-content-center flex-column' : ''")
			PhotoWrapper(photo="/search.jpg" :media="false")
			UiHeading(title="This is blackband" show-description description="Embark on an extraordinary journey with Black Band, where we redefine travel in Africa with unwavering confidence." align="center")
			form(@submit.prevent="handleSubmit" v-if="$device.isMobile")
				.input-group
					span.input-group-text
						Icon(name="material-symbols:search")
					input(v-model='searchQuery' @input="updateSearch" type='text' aria-label='Amount (to the nearest dollar)' placeholder='Experiences')
					span.input-group-text(@click="showModal")
						Icon(name="flowbite:adjustments-horizontal-solid" size="1.2em")
			SearchBar(v-if="$device.isDesktop")
			//- .home-form(v-if="$device.isDesktop")
				form(@submit.prevent="handleSubmit")
					.row
						.col-6
							.input-group
								span.input-group-text
									Icon(name="material-symbols:search")
								input(v-model='searchQuery' @input="updateSearch" type='text' aria-label='Amount (to the nearest dollar)' placeholder='Experiences')
						.col-3
						.col-3



				//- .filters.d-flex.justify-content-around.align-items-center
					.box.d-flex.flex-column.align-items-center(v-for="item in filtersCat" key="item.label")
						Icon(:name="item.icon" size="1.5em")
						.label {{ item.label }}
</template>

<style lang="scss" scoped>
#herosearch {
	padding-top: a.$padding-quart;
	padding-bottom: a.$padding;

	.nested {
		padding: 12rem 0;
		padding-left: 2rem;
		padding-right: 2rem;
		// background-color: a.color(black);
		border-radius: a.$border-radius;
		position: relative;
		overflow: hidden;

		:deep(#searchbox) {
			position: absolute;
			bottom: 0;
			background-color: #f5f5f510;
			transition: .3s;

			&:hover {
				background-color: #f5f5f520;
			}
		}

		:deep(.title) {
			color: a.color(white);
		}

		:deep(.description) {
			color: a.color(white);
		}

		.input-group {
			margin-bottom: 1.5rem;

			.input-group-text {
				background-color: white;
				border: none;
			}

			input {
				border: none;
				padding: 0.6rem;
				position: relative;
				flex: 1 1 auto;
				width: 1%;
				min-width: 0;

				&[placeholder] {
					font-size: 0.8rem;
				}
			}
		}

		.filters {
			background-color: a.color(white);
			border-radius: 5px;
			padding: 0.5rem;

			.box {
				.label {
					font-size: 0.8rem;
					opacity: 0.5;
				}
			}
		}
	}
}

@media screen and (min-width: a.$breakpoint-mt) {
	#herosearch {
		padding-top: 0;
		padding-bottom: a.$padding-full;

		.nested {
			padding-top: 10rem;
			padding-bottom: 10rem;
			border-radius: 0;
			height: 100vh;
			overflow: hidden;

			.home-form {
				background-color: #ffffff50;
				padding: 1rem 2rem;
				width: 800px;
				border-radius: a.$border-radius;

				.input-group {
					margin-bottom: 0rem;
					background-color: a.color(white);
				}
			}

			:deep(.title) {
				font-size: 3rem;
			}
		}
	}
}
</style>
