<script setup lang="ts">
defineProps(['filters'])
defineEmits(['close-modal', 'save-filter'])
</script>

<template lang="pug">
form
	.row
		.title Search filters
		.col-12
			select.form-select(aria-label='Default select' :style="{marginTop: '0'}" v-model="filters.trip")
				option(selected disabled value='') Type
				option Accomodation
				option Transportation
				option Private Chef
				option Custom Clothing
				option Leisure
				option Wellness
				option Airfare
		.col-12
			select.form-select(aria-label='Default select' v-model="filters.location")
				option(selected='' disabled value='') Location
				option Ghana
		.col-6
			.button
				button(type="button" :style="{backgroundColor: 'crimson'}" @click="$emit('closeModal')") Close
		.col-6
			.button
				button(type="button" @click="$emit('saveFilter')") Save
</template>

<style lang="scss" scoped>
select.form-select {
	margin-top: 1rem;
	padding: 0.6rem;
	border: 1px solid #ededed;
	box-shadow: none;

	&:focus {
		box-shadow: none;
		border-color: #ededed;
	}
}

.button {
	padding-top: 1rem;

	button {
		@include a.button;
		color: a.color(white);
		background-color: a.color(black);
		border: none;
		border-radius: a.$border-radius;
		padding: 0.8rem 2rem;
		display: block;
		width: 100%;
	}
}
</style>
