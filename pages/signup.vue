<script setup lang="ts">
const supabase = useSupabaseClient()
useHead({
	titleTemplate: `Signup - %s`,
})

const user = reactive({
	fullname: '',
	password: '',
	email: '',
})

const signup = async () => {
	try {
		const { data, error } = await supabase.auth.signUp({
			email: user.email,
			password: user.password,
			options: {
				data: {
					username: user.fullname,
				},
			},
		})

		if (data.user && data.user.identities && data.user.identities.length === 0) {
			return alert("User already Exists")
		}

		if (error) {
			return alert(error)
		}

		alert('Confirm your email address')
		navigateTo('/login')
	} catch (err) {
		if(err instanceof Error) throw createError({
			statusCode: 401,
			statusMessage: err.message,
		})
	} finally {
		user.email = ''
		user.password = ''
		user.fullname = ''
	}
}

definePageMeta({
	middleware: [
		function (to, from) {
			const user = useSupabaseUser()

			if (user.value) {
				return navigateTo('/login')
			}

			return
		},
	],
})
</script>

<template lang="pug">
section#signup.container-fluid.px-0
	div(v-if="$device.isMobile")
		Hero(photo="/signup.jpg")
		.container
			UiHeading(title="Create an account" align="center" show-description description="Allow us to help tailor your journey and discover a world of culture.")
			AuthForm(:auth="signup", :user="user")
	.row(v-else)
		.col-sm-8
			.logo
				NuxtLink(to="/")
					NuxtImg(src="/logo.svg" width="45" height="45")
			Hero(photo="/signup.jpg")
		.col-sm-4.d-flex.justify-content-center.align-items-center
			.container
				UiHeading(title="Create an account" align="center" show-description description="Allow us to help tailor your journey and discover a world of culture.")
				AuthForm(:auth="signup", :user="user")
				.text Already have an account? #[NuxtLink(to="/login") Login here]
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
	section#signup {
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

