<script setup lang="ts">
defineProps(['toggleOpen'])
const user = useSupabaseUser()
</script>

<template lang="pug">
header.container-fluid.px-0
	.container.d-flex.justify-content-between.align-items-center.px-3
		NuxtLink(to="/")
			.logo
				NuxtImg(src="/logo.svg" width="40" height="40")
		.button.ms-auto
			NuxtLink(v-if="user" to='/dashboard')
				button Dashboard
			NuxtLink(v-else :to="$route.path.includes('login') ?'/signup' : $route.path.includes('signup') ? '/login' : '/login'")
				button {{$route.path.includes('login') ?'signup' : $route.path.includes('signup') ? 'login' : 'login'}}
		.hamburger.ms-3(@click="toggleOpen")
			Icon(name="ci:hamburger-md" size='1.5em')
</template>