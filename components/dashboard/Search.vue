<script setup lang="ts">
const props = defineProps(['filters'])
const searchQuery = ref('')
const route = useRoute()
const user = useSupabaseUser()

const handleSubmit = () => {
	if (!searchQuery.value) return

	if(route.path === '/search' || user) {
		navigateTo(
			`/search?query=${searchQuery.value}${
				props.filters.trip ? `&trip=${props.filters.trip}` : ''
			}${props.filters.location ? `&location=${props.filters.location}` : ''}`, {
				external: true
			}
		)

	} else {
		navigateTo(
			`/search?query=${searchQuery.value}${
				props.filters.trip ? `&trip=${props.filters.trip}` : ''
			}${props.filters.location ? `&location=${props.filters.location}` : ''}`
		)
	}
	
}
</script>

<template lang="pug">
section#search.container 
	form(@submit.prevent="handleSubmit")
		.row 
			.col-9.pe-2
				.input-group
					span.input-group-text
						Icon(name="material-symbols:search" size='1.2em')
					input.form-control(
						type="text"
						v-model="searchQuery"
						placeholder="Search Destination"
						aria-label="Search Destination"
						aria-describedby="input-group-left"
						autoComplete="on"
						)
					span.input-group-text(@click="$emit('showModal')")
						Icon(name="flowbite:adjustments-horizontal-solid" size="1.2em")
			.col-3.ps-0
				button(type="submit") search
</template>

<style lang="scss" scoped>
.input-group {
	margin-bottom: 1rem;

	.input-group-text {
		background-color: transparent;
		border: 1px solid #ededed;
		height: 35.6px;
	}

	input {
		padding: 0.6rem;
		position: relative;
		flex: 1 1 auto;
		width: 1%;
		min-width: 0;
		border: 1px solid #ededed;
		border-left: none;
		border-right: none;
		box-shadow: none;
		outline: none;

		&[placeholder] {
			font-size: 0.8rem;
		}
	}
}

button {
	width: 100%;
	border: none;
	border-radius: a.$border-radius;
	padding: 0.6rem 1rem;
	font-size: a.$twelve;
	font-weight: 300;
	background-color: a.color(black);
	color: a.color(white);
}
</style>
