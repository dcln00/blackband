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

		if(route.redirectTo) {

			navigateTo(`confirm?redirectTo=${route.redirectTo}`)
		}else {
			
			navigateTo('confirm')
		}
		
	} catch (err) {
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
	.container
		Hero(photo="/login.jpg")
		UiHeading(title="Login" align="center" show-description description="Already registered? Log in here.")
		AuthForm(:auth="login" :user="user" :disabled="disabled")
		ErrorBound(v-if='error' message="Wrong Username or Password")
</template>
