<script lang="ts" setup>
defineProps(['menu'])
</script>

<template lang="pug">
section#profile-menu.container
	DashMenuItem(v-for="item in menu" :title="item.title" :key="item.title")
</template>

<style lang="scss">
#profile-menu {
	.menu-item {
	
		.title {
			padding-bottom: 0;
			font-weight: 500;
		}
	}
}
</style>