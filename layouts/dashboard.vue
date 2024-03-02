<template lang="pug">
div
	DashboardNav(v-if="$route.name !== 'dashboard-destinations-slug'")
	main
		slot
</template>