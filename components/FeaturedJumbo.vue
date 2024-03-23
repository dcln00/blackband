<script setup lang="ts">
defineProps(["photo", "title", "category", "date"]);
</script>

<template lang="pug">
section#jumbo.container
	.nested.d-flex.justify-content-center.align-items-center
		div
			PhotoWrapper(:photo="photo")
			.details
				.cat-list.d-flex.justify-content-center
					.category(v-for="item in category" :key="item") {{ item.name }}
				.title {{ title }}
				.date {{ $dayjs(date).format('MMMM DD YYYY') }}
</template>

<style lang="scss" scoped>
#jumbo {
	padding-top: calc(a.$padding / 2);
	padding-bottom: a.$padding;

	.nested {
		border-radius: a.$border-radius;
		aspect-ratio: 8/9;
		position: relative;
		overflow: hidden;
		padding: 2rem;

		.details {
			color: a.color(white);
			text-align: center;

			.cat-list {
				column-gap: 12px;
			}

			.category {
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
