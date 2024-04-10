<template lang="pug">
div
	Loader
	DashboardNav(v-if="$route.name !== 'dashboard-experiences-slug'")
	main
		slot
</template>