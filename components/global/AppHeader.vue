<script setup lang="ts">

</script>

<template lang="pug">
header.container-fluid 
	.nested.d-flex.justify-content-between.align-items-center
		NuxtLink(to="/")
			.logo
				NuxtImg(src="/logo.svg" width="40" height="40")
		nav
			
</template>

<style scoped lang="scss">
header {
	position: fixed;
	background-color: rgba(255, 255, 255, 0.308);
	top: 0;
	left: 0;
	width: 100%;
}
</style>