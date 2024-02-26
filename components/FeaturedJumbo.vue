<script setup lang="ts">
defineProps(["photo", "title", "category", "date"]);
</script>

<template lang="pug">
section#jumbo
	.nested.d-flex.justify-content-center.align-items-center
		div
			PhotoWrapper(:photo="photo")
			.details
				span.category(v-for="item in category" :key="item") {{ item.name }}
				.title {{ title }}
				.date {{ $dayjs(date).format('MMMM DD YYYY') }}
</template>

<style lang="scss">
@use "../assets/style/abstracts" as a;

#jumbo {
	padding-top: calc(a.$padding / 2);
	padding-bottom: a.$padding;

	.nested {
		border-radius: a.$border-radius;
		aspect-ratio: 8/9;
		position: relative;
		overflow: hidden;

		.details {
			color: a.color(white);
			text-align: center;

			span.category {
				display: inline-block;
				padding-bottom: 1rem;
				font-size: a.$eight;
				text-transform: uppercase;
				font-weight: 500;
			}

			.date {
				font-size: a.$ten;
				text-transform: uppercase;
			}
		}
	}
}
</style>
