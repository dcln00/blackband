<script setup lang="ts">
defineEmits(['vnode-unmounted'])
const nuxtApp = useNuxtApp()
const searchQuery = refDebounced(ref(''), 1000)

const search = computed(
	() => `/api/destinations/search?query=${searchQuery.value}`
)
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

const { data: searchList, error: searchError, pending: searchPending } = await useLazyFetch(search)

useHead({
	titleTemplate: `Destinations - %s`,
})
</script>

<template lang="pug">
div 
	DashTitle(title="destinations")
	DashSearch(v-model="searchQuery")
	DashDestinations(v-if='searchQuery' :data="searchList" :search-pending="searchPending")
	DashDestinations(v-else :data="places" :pending="pending")
</template>