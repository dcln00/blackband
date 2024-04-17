<script setup lang="ts">
defineProps(['message'])
</script>

<template lang="pug">
.error-bound.d-flex.align-items-center
	Icon(name="charm:circle-cross" size='1.2em' color="red")
	.message {{ message }}
</template>

<style lang="scss">
.error-bound {
	column-gap: 20px;
	border: 1px solid red;
	padding: .5rem;
	border-radius: 5px;
	margin-bottom: 1rem;

	.message {
		color: red;
		text-transform: capitalize;
	}
}
</style>
