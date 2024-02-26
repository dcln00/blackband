<script setup lang="ts">
defineEmits(['vnode-unmounted'])
const nuxtApp = useNuxtApp()

const searchQuery = ref('')

const search = computed(
	() => `/api/destinations/search?query=${searchQuery.value}`
)
const query = computed(() => `/api/destinations/places`)

const { data } = useNuxtData('destinationList')

const { data: places, pending, error } = useLazyFetch(query, {
	getCachedData(key) {
		return nuxtApp.payload.data[key] || nuxtApp.static.data[key]
	},
	default() {
		return data.value
	}
})

const { data: searchList, error: searchError, pending: searchPending } = await useFetch(search)

useHead({
	titleTemplate: `Destinations - %s`,
})
</script>

<template lang="pug">
div 
	DashTitle(title="destinations")
	DashSearch(v-model="searchQuery")
	ClientOnly
		LazyDashDestinations(v-if='searchQuery' :data="searchList" :pending="searchPending")
		LazyDashDestinations(v-else :data="places" :pending="pending")
</template>