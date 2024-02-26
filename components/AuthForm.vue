<script lang="ts" setup>
defineProps(['auth', 'user', 'disabled'])
</script>

<template lang="pug">
form(@submit.prevent="auth")
	.input-group(v-if='$route.path.includes("signup")')
		span#input-group-left-example.input-group-text
			Icon(name="ph:user-bold" size='1em')
		input.form-control(
			type="text"
			v-model="user.fullname"
			placeholder="Full Name"
			aria-label="Full Name"
			aria-describedby="input-group-left"
			autoComplete="on"
			)
	.input-group
		span#input-group-left-example.input-group-text(:style="disabled ? {backgroundColor: '#e9ecef'} : {}")
			Icon(name="material-symbols:mail-outline" size='1em')
		input.form-control(
			type="email"
			v-model="user.email"
			placeholder="Email"
			aria-label="Email"
			aria-describedby="input-group-left"
			autoComplete="on"
			:disabled="disabled"
			)
	.input-group
		span#input-group-left-example.input-group-text(:style="disabled ? {backgroundColor: '#e9ecef'} : {}")
			Icon(name="material-symbols:lock-outline" size='1em')
		input.form-control(
			type="password"
			v-model="user.password"
			placeholder="Password"
			aria-label="Password"
			aria-describedby="input-group-left"
			:disabled="disabled"
			)
	.button
		button(type="submit") {{$route.path.includes('login') ?'login' : $route.path.includes('signup') ? 'signup' : ''}}
</template>

<style lang="scss" scoped>
@use '../assets/style/abstracts' as a;
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

		&[placeholder] {
			font-size: 0.8rem;
		}
	}
}

.button {
	padding-top: 1rem;
	button {
		@include a.button;
		border: 1px solid black;
		border-radius: a.$border-radius;
		padding: 0.8rem 2rem;
		display: block;
		margin: 0 auto;
	}
}
</style>
