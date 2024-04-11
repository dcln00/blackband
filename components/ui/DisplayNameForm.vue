<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const props = defineProps(['showModal'])
defineEmits(['show-modal'])

const input = reactive({
	name: user.value?.user_metadata?.username,
})

async function handleChangeDisplay() {

	if(!input.name) return

	const { data, error } = await supabase.auth.updateUser({
		data: { username: input.name },
	})

	props.showModal()

	await navigateTo('/dashboard/account')
}
</script>

<template lang="pug">
form(@submit.prevent="handleChangeDisplay")
	.row
		.col-12
			input(type="text" v-model="input.name" placeholder="Enter Display Name")
		.col-6
			.button
				button(type="button" :style="{backgroundColor: 'crimson'}" @click="$emit('showModal')") Close
		.col-6
			.button
				button(type="submit") Save
</template>

<style lang="scss">
input {
	padding: 0.6rem;
	width: 100%;
	border: 1px solid a.color(black);
	border-radius: a.$border-radius;
	box-shadow: none;
	margin-bottom: 1rem;

	&[placeholder] {
		font-size: 0.8rem;
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
