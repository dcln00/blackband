<template lang="pug">
.error-bound.d-flex
	Icon(name="charm:circle-cross" size='1em')
	.message {{ message }}
</template>

<script setup lang="ts">
defineProps(['message'])
</script>

<style lang="scss">
.error-bound {
	column-gap: 20px;
	border: 1px solid red;
	padding: 1rem;
	border-radius: 5px;

	.message {
		color: red;
		text-transform: capitalize;
	}
}
</style>

