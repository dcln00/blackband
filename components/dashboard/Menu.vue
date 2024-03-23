<script lang="ts" setup>
defineProps(['menu', 'event'])
</script>

<template lang="pug">
section#profile-menu.container
	DashMenuItem(v-for="item in menu" :title="item.title" :url="item.url" :external="item.external" :key="item.title" @some-event="event")
</template>

<style lang="scss">
#profile-menu {
	.menu-item {

		a {
			cursor: pointer;
		}
	
		.title {
			padding-bottom: 0;
			font-weight: 500;
			cursor: pointer;
		}
	}
}
</style>