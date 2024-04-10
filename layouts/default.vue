<script lang="ts" setup>
const route = useRoute()
const isOpen = ref(false)

function toggleOpen() {
	isOpen.value = !isOpen.value
}

const pages = computed(() =>
	route.path === '/' || route.path === '/login' || route.path === '/signup' || route.params.parentSlug === 'featured' || route.params.parentSlug === 'experiences' ? true : false
)
</script>

<template lang="pug">
div.body-outlet
	Loader
	Navigation(v-if="$device.isMobile" :isOpen="isOpen" :close-nav="toggleOpen")
	Header(v-if="$device.isMobile" :toggle-open="toggleOpen")
	AppHeader(v-else-if="$route.path !== '/login' && $route.path !== '/signup'")
	.spacing(:style="{paddingTop: '129.783px'}" v-if="$device.isDesktop && !pages")
	main
		slot
	Footer(v-if="$device.isMobile && !$route.path.includes('login') && !$route.path.includes('signup') && $route.params.parentSlug !== 'experiences'")
	AppFooter(v-else-if="!$route.path.includes('login') && !$route.path.includes('signup') && $device.isDesktop")
</template>

<style lang="scss">
.body-outlet {
	min-height: 100vh;
	display: flex;
	flex-direction: column;

	main {
		flex-grow: 1;
	}
}
</style>