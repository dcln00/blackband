<script setup lang="ts">
defineProps(['data'])
</script>

<template lang="pug">
section#clients
	UiHeading(title="Worked With" align="center")
	Swiper(
		:modules="[SwiperAutoplay, SwiperPagination]"
		:slides-per-view="$device.isMobile ? 2 : 5"
		:space-between="25"
		:loop="true"
		:autoplay="{delay: 3000, disableOnInteraction: true}"
		:pagination="{enabled: true}"
	)
		SwiperSlide(v-for="(item, index) in data?.workedWith.nodes" :key="index")
			.slider.d-flex.justify-content-center.align-items-center
				NuxtImg(:src="item?.sourceUrl" width="50" height="50")
</template>

<style scoped lang="scss">
:deep(.swiper) {
	overflow-y: visible;
}

:deep(.swiper-pagination-horizontal) {
	bottom: -10px !important;
	transform: scale(0.6, 0.6);

	.swiper-pagination-bullet-active {
		background-color: #000 !important;
	}
}

.slider {
	aspect-ratio: 1;

	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		transform: scale(.6,.6);
	}
}
</style>