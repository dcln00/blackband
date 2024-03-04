<template lang="pug">
section#loader.container-fluid.d-flex.justify-content-center.align-items-center
	Icon(name="svg-spinners:bouncing-ball" color="black")
</template>

<style lang="scss">
#loader {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100vh;
	z-index: 100;
	background-color: a.color(white);
}
</style>
