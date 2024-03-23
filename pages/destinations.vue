<script setup lang="ts">
defineEmits(['vnode-unmounted'])
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
	if(filters.trip) url.searchParams.set('&trip', filters.trip)
	if(filters.location) url.searchParams.set('&location', filters.location)
	window.history.pushState({}, '', url.toString())
}

const query = computed(() => `/api/destinations/places`)

const {
	data: places,
	pending,
	error,
} = await useLazyFetch(query.value, {
	key: 'destinationList',
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

useHead({
	titleTemplate: `Destinations - %s`,
})
</script>

<template lang="pug">
div 
	Teleport(to="body")
		DashModal(:is-open="isOpen" :close-modal="showModal")
			UiSearchFilters(@close-modal="handleClose" @save-filter="showModal" :filters="filters")
	.container(:style="{paddingTop: '2.5rem'}")
		UiHeading(title="Destinations" show-description :description="`Dive into our Destination Page, a curated collection of tailor-made experiences just for you. <br><br> Whether you’re in for business or leisure , use our advanced search filter to handpick the exact adventures you crave. <br><br> Unleash a world of possibilities and discover personalized recommendations that match your unique desires. Your dream escape is just a click away!`" )
	DashSearch(@show-modal="showModal" :filters="filters" :update-search="updateSearch")
	DashDestinations(:data="places" :pending="pending")
</template>
