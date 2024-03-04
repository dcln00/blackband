<template lang="pug">
div
	Loader
	DashboardNav(v-if="$route.name !== 'dashboard-destinations-slug'")
	main
		slot
</template>