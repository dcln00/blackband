<script setup lang="ts">
const supabase = useSupabaseClient()

const logout = async () => {
	const { error } = await supabase.auth.signOut()
  	if (error) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Something went wrong'
		})
	}
	return navigateTo('/')
}

const settings = [
	{
		title: 'Edit Profile',
		url: '#'
	},
]

const solutions = [
	{
		title: 'BlackBand Business Experience',
		url: '#'
	},
	{
		title: 'BlackBand Leisure Experience',
		url: '#'
	},
	{
		title: 'BlackBand Yearly Experiences',
		url: '#'
	},
	{
		title: 'Exclusive Offers',
		url: '#'
	},
]

useHead({
	titleTemplate: `Profile - %s`,
})
</script>

<template lang="pug">
div#dashboard-profile 
	DashTitle(title="profile")
	DashHeader
	DashTitle(title="settings")
	DashMenu(:menu="settings")
	DashTitle(title="solutions" padding="1.5rem")
	DashMenu(:menu="solutions")
	.profile-footer.container.pt-4
		NuxtLink(@click='logout')
			p.cursor-pointer Logout
</template>

<style lang="scss">
#dashboard-profile {
	margin-bottom: 8rem;

	.profile-footer a {
		cursor: pointer;
		color: red;
	}
}
</style>
