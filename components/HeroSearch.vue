<script lang="ts" setup>
const route = useRoute()
const searchQuery = ref('')
const isOpen = ref(false)
const url = useRequestURL()

const filters = reactive({
	trip: '',
	location: ''
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
	const url = useRequestURL()
	url.searchParams.set('query', searchQuery.value)
	if(filters.trip) url.searchParams.set('&trip', filters.trip)
	if(filters.location) url.searchParams.set('&location', filters.location)
	window.history.pushState({}, '', url.toString())
}

const handleSubmit = () => {
	if (!searchQuery.value) return

	navigateTo(`/search?query=${searchQuery.value}${filters.trip ? `&trip=${filters.trip}` : ''}${filters.location ? `&location=${filters.location}` : ''}`)
}

const filtersCat = [
	{
		icon: 'lucide:palmtree',
		label: 'Destinations'
	},
	{
		icon: 'mingcute:bus-2-line',
		label: 'tours'
	},
	{
		icon: 'lucide:party-popper',
		label: 'Detty December'
	},
]
</script>

<template lang="pug">
div
	Teleport(to="body")
		DashModal(:is-open="isOpen" :close-modal="showModal")
			UiSearchFilters(@close-modal="handleClose" @save-filter="showModal" :filters="filters")

	section#herosearch(:class="$device.isMobile ? 'container' : 'container-fluid px-0'")
		.nested
			PhotoWrapper(photo="/search.jpg")
			UiHeading(title="This is blackband" show-description description="Embark on an extraordinary journey with Black Band, where we redefine travel in Africa with unwavering confidence." align="center")
			form(@submit.prevent="handleSubmit")
				.input-group
					span.input-group-text
						Icon(name="material-symbols:search")
					input(v-model='searchQuery' @input="updateSearch" type='text' aria-label='Amount (to the nearest dollar)' placeholder='Destination')
					span.input-group-text(@click="showModal")
						Icon(name="flowbite:adjustments-horizontal-solid" size="1.2em")
				.filters.d-flex.justify-content-around.align-items-center
					.box.d-flex.flex-column.align-items-center(v-for="item in filtersCat" key="item.label")
						Icon(:name="item.icon" size="1.5em")
						.label {{ item.label }}
</template>

<style lang="scss" scoped>
#herosearch {
	padding-top: a.$padding;
	padding-bottom: a.$padding;

	.nested {
		padding: 4rem;
		padding-left: 2rem;
		padding-right: 2rem;
		// background-color: a.color(black);
		border-radius: a.$border-radius;
		position: relative;
		overflow: hidden;


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
				padding: .6rem;
				position: relative;
				flex: 1 1 auto;
				width: 1%;
				min-width: 0;

				&[placeholder] {
					font-size: .8rem;
				}
			}
		}

		.filters {
			background-color: a.color(white);
			border-radius: 5px;
			padding: .5rem;

			.box {
				.label {
					font-size: .8rem;
					opacity: .5;
				}
			}
		}
	}
}

@media screen and (min-width: a.$breakpoint-mt) {

#herosearch {
	padding-top: 0;

	.nested {
		padding-top: 10rem;
		padding-bottom: 10rem;
		border-radius: 0;
	}
}
}
</style>