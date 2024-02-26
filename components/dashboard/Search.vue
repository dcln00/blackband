<script setup lang="ts">
defineEmits(['update:model-value'])
const model = defineModel()
</script>

<template lang="pug">
section#search.container 
	.input-group
		span#input-group-left-example.input-group-text
			Icon(name="material-symbols:search" size='1.1em')
		input.form-control(
			type="text"
			v-model="model"
			placeholder="Search Destination"
			aria-label="Search Destination"
			aria-describedby="input-group-left"
			autoComplete="on"
			)
</template>

<style lang="scss" scoped>
@use '../../assets/style/abstracts' as a;
.input-group {
	margin-bottom: 1rem;

	.input-group-text {
		background-color: transparent;
		border: 1px solid #ededed;
		border-right: none;
	}

	input {
		padding: 0.6rem;
		position: relative;
		flex: 1 1 auto;
		width: 1%;
		min-width: 0;
		border: 1px solid #ededed;
		border-left: none;
		box-shadow: none;
		outline: none;

		&[placeholder] {
			font-size: 0.8rem;
		}
	}
}
</style>