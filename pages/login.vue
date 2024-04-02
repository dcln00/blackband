<script setup lang="ts">
const supabase = useSupabaseClient()
const route = useRoute().query

useHead({
	titleTemplate: `Login - %s`,
})

const user = reactive({
	password: '',
	email: '',
})

const disabled = ref(false)

const login = async () => {
	try {
		disabled.value = true

		const { error } = await supabase.auth.signInWithPassword({
			email: user.email,
			password: user.password,
		})
		if (error) {
			alert(error)
			return
		}

		if (route.redirectTo) {
			await navigateTo(`confirm?redirectTo=${route.redirectTo}`)
		} else {
			await navigateTo('confirm')
		}

		return error
	} catch (err) {
		if (err instanceof Error)
			throw createError({
				statusCode: 400,
				statusMessage: err.message,
			})
	} finally {
		user.password = ''
		user.email = ''
		disabled.value = false
	}
}

definePageMeta({
	middleware: [
		function (to, from) {
			const user = useSupabaseUser()

			if (user.value) {
				return navigateTo('/dashboard')
			}

			return
		},
	],
})
</script>

<template lang="pug">
section#login.container-fluid.px-0
	div(v-if="$device.isMobile")
		Hero(photo="/login.jpg")
		.container
			UiHeading(title="Login" align="center" show-description description="Already registered? Log in here.")
			AuthForm(:auth="login" :user="user" :disabled="disabled")
			ErrorBound(v-if='error' message="Wrong Username or Password")
	.row(v-else)
		.col-sm-8
			.logo
				NuxtLink(to="/")
					NuxtImg(src="/logo.svg" width="45" height="45")
			Hero(photo="/login.jpg")
		.col-sm-4.d-flex.justify-content-center.align-items-center
			.container
				UiHeading(title="Login" align="center" show-description description="Already registered? Log in here.")
				AuthForm(:auth="login" :user="user" :disabled="disabled")
				ErrorBound(v-if='error' message="Wrong Username or Password")
				.text Don't have an account? #[NuxtLink(to="/signup") Sign up here]
</template>

<style lang="scss" scoped>
.col-sm-4,
.col-sm-8 {
	padding: 0;
	position: relative;

	.logo {
		position: absolute;
		top: 1rem;
		left: 1rem;
		z-index: 1;
		filter: invert(100);
	}
}

@media screen and (min-width: a.$breakpoint-mt) {
	section#login {
		.col-sm-4,
		.col-sm-8 {
			height: 100vh;
			padding: 0;

			.container {
				width: 85%;

				.text {
					text-align: center;
					margin-top: 2rem;

					a {
						text-decoration: underline;
					}
				}
			}

			:deep(#hero) {
				padding-bottom: 0;
				.nested {
					height: 100vh;
				}
			}
		}
	}
}
</style>
