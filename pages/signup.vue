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
		throw createError({
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
	.container
		Hero(photo="/signup.jpg")
		UiHeading(title="Create an account" align="center" show-description description="Allow us to help tailor your journey and discover a world of culture.")
		AuthForm(:auth="signup", :user="user")
</template>
