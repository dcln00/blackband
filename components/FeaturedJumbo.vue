<script setup lang="ts">
defineProps(["photo", "title", "category", "date"]);
</script>

<template lang="pug">
section#jumbo(:class="$device.isMobile ? 'container' : 'container-fluid px-0'")
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

@media screen and (min-width: a.$breakpoint-mt) {
	#jumbo {
		.nested {
			aspect-ratio: auto;
			height: 80vh;
			border-radius: 0;

			.details {
				.category {
					font-size: a.$ten;
				}

				.title {
					font-size: 1.5rem;
				}
			}
		}
	}
}
</style>
