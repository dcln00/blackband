<script lang="ts" setup>
const route = useRoute()
const searchQuery = ref('')

const updateSearch = () => {
	const url = new URL(window.location.href)
	url.searchParams.set('search', searchQuery.value)
	window.history.pushState({}, '', url.toString())
}

const filters = [
	{
		icon: 'mdi:umbrella-beach-outline',
		label: 'Tropical'
	},
	{
		icon: 'material-symbols:houseboat-outline-rounded',
		label: 'Lakes'
	},
	{
		icon: 'lucide:palmtree',
		label: 'Beachview'
	},
	{
		icon: 'mingcute:surfboard-line',
		label: 'Surfing'
	},
	{
		icon: 'ri:fire-line',
		label: 'Trending'
	},
]
</script>

<template lang="pug">
section#herosearch.container
	.nested-container
		PhotoWrapper(photo="/search.jpg")
		Heading(title="This is blackband" show-description description="Embark on an extraordinary journey with Black Band, where we redefine travel in Africa with unwavering confidence." align="center")
		.input-group
			span.input-group-text
				Icon(name="material-symbols:search")
			input(v-model='searchQuery' @input="updateSearch" type='text' aria-label='Amount (to the nearest dollar)' placeholder='Destination')
			span.input-group-text
				Icon(name="ic:outline-settings-input-component")
		.filters.d-flex.justify-content-around.align-items-center
			.box.d-flex.flex-column.align-items-center(v-for="item in filters" key="item.label")
				Icon(:name="item.icon" size="1.5em")
				.label {{ item.label }}
</template>