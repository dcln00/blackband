<script setup lang="ts">
defineProps({
	photo: {
		type: String,
		default: '/error.jpg',
	},
	media: {
		type: Boolean,
		default: true,
	},
})
</script>

<template lang="pug">
.photo-wrapper(v-if="media")
	NuxtImg(:src="photo")
.video-wrapper(v-else)
	video(playsinline, autoplay, muted, loop)
		source(src="/hero.mp4" type="video/mp4")
</template>

<style lang="scss" scoped>
.photo-wrapper {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;

	&:after {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}

.video-wrapper {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;

	&:after {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}

	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
	}
}
</style>
