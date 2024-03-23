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


const { data: places, pending, error } = await useLazyFetch(query.value, {
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
	DashTitle(title="destinations")
	DashSearch(@show-modal="showModal" :filters="filters" :update-search="updateSearch" )
	DashDestinations(:data="places" :pending="pending")
</template>