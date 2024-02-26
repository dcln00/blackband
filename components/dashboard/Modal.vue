<script setup lang="ts">
defineProps(['isOpen', 'closeModal'])
</script>

<template lang="pug">
div
	Transition(name="ovlay")
		.overlay(v-if="isOpen" @click="closeModal")
	Transition(name="modal")
		#modal.container(v-if="isOpen")
			.nested
				.close(@click="closeModal")
					Icon(name="solar:close-square-bold" size='1.5em')
				.modal-body
					slot
</template>

<style lang="scss" scoped>
@use '../../assets/style/abstracts' as a;

.overlay {
	background-color: rgba(0, 0, 0, 0.7);
	z-index: 20;
}

#modal {
	position: fixed;
	top: 50%;
	left: 50%;
	margin-left: -50%;
	margin-top: -30%;
	// transform: translate(-50%, -50%);
	z-index: 30;

	.nested {
		padding-top: 3.5rem;
		padding-bottom: 1.5rem;
		padding-left: 1.5rem;
		padding-right: 1.5rem;
		background-color: a.color(white);
		border-radius: a.$border-radius;
		position: relative;
		color: a.color(black);

		.close {
			position: absolute;
			right: 1rem;
			top: 1rem;
		}
	}
}
</style>
