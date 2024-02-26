export default defineNuxtRouteMiddleware((to, from) => {
	const user = useSupabaseUser()

	if (!user.value) {
		return navigateTo('/login',  { redirectCode: 301 })
	}

	return
})
