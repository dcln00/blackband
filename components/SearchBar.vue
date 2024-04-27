<script lang="ts" setup>
const url = useRequestURL()
const route = useRoute()
const searchQuery = ref('')
const isLoading = ref(false)
const filters = reactive({
	trip: '',
	location: '',
})

const updateSearch = () => {
	if (searchQuery.value) url.searchParams.set('query', searchQuery.value)
	if (filters.trip) url.searchParams.set('&trip', filters.trip)
	if (filters.location) url.searchParams.set('&location', filters.location)
	window.history.pushState({}, '', url.toString())
}

const handleSubmit = async () => {
	try {
		if (!searchQuery.value) return

		isLoading.value = true

		if(route.path === '/search') {
		await navigateTo(
			`/search?query=${searchQuery.value}${
				filters.trip ? `&trip=${filters.trip}` : ''
			}${filters.location ? `&location=${filters.location}` : ''}`, {
				external: true
			}
		)

	} else {
		await navigateTo(
			`/search?query=${searchQuery.value}${
				filters.trip ? `&trip=${filters.trip}` : ''
			}${filters.location ? `&location=${filters.location}` : ''}`
		)
	}
	} catch (e) {
		console.log(e.message)
	} finally {
		isLoading.value = false
	}
}
</script>

<template lang="pug">
#searchbox.container-fluid.px-0
	.container 
		form(@submit.prevent="handleSubmit")
			.row
				.col-sm-6
					.input-group
						span.input-group-text
							Icon(name="material-symbols:search" size='1.2em')
						input.form-control(
							type="text"
							v-model="searchQuery"
							@input="updateSearch"
							placeholder="Book Experiences"
							aria-label="Book Experiences"
							aria-describedby="input-group-left"
							autoComplete="on"
							)
				.col-sm-2
					select.form-select(aria-label='Default select' v-model="filters.trip" @change="updateSearch")
						option(selected disabled value='') Type
						option Accomodation
						option Transportation
						option Private Chef
						option Custom Clothing
						option Leisure
						option Wellness
						option Airfare
				.col-sm-2
					select.form-select(aria-label='Default select' v-model="filters.location" @change="updateSearch")
						option(selected='' disabled value='') Location
						option Ghana
				.col-sm-2
					button(type="submit" v-if="!isLoading") Search
					button(type="submit" v-else)
						Icon(name="svg-spinners:8-dots-rotate" size='1.2em')
</template>

<style lang="scss" scoped>
#searchbox {
	// position: sticky;
	// top: 108.783px;
	background-color: #f5f5f5;
	padding-top: 3rem;
	padding-bottom: 3rem;

	.input-group {
		margin-bottom: 1rem;

		.input-group-text {
			background-color: white;
		}

		input {
			padding: 0.6rem;
			position: relative;
			// flex: 1 1 auto;
			// width: 1%;
			min-width: 0;
			border-left: none;
			box-shadow: none;
			outline: none;

			&:focus {
				box-shadow: none;
				outline: none;
				border-color: #d8dce1;
			}
		}
	}

	select.form-select {
		border: 1px solid #ededed;
		box-shadow: none;
		padding: 0.6rem;

		&:focus {
			box-shadow: none;
			border-color: #ededed;
		}
	}

	button {
		width: 100%;
		border: none;
		border-radius: a.$border-radius;
		padding: 0.6rem 1rem;
		font-weight: 300;
		background-color: a.color(black);
		color: a.color(white);
	}
}
</style>
