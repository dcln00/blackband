<script setup lang="ts">
defineProps(['category', 'rating', 'title', 'price', 'location', 'photo', 'slug'])
</script>

<template lang="pug">
.destination
	NuxtLink(:to="`/dashboard/destinations/${slug}`")
		.photo
			DashDestWrapper(:photo="photo")
			.category {{ category[0].name }}
			.rating.d-flex.align-items-center
				Icon(name="material-symbols:kid-star-sharp" color='white')
				.num 5.0
	.details
		.box.d-flex.align-items-center
			NuxtLink(:to="`/dashboard/destinations/${slug}`")
				.title {{ title }}
			.price.ms-auto ${{ price }}
		.box.d-flex.align-items-center
			.location Accra, Ghana
</template>

<style lang="scss">
@use '../../assets/style/abstracts' as a;

.destination {
	padding-bottom: 1.5rem;
	.photo {
		// background-color: pink;
		aspect-ratio: 16/8;
		border-radius: a.$border-radius;
		position: relative;

		.rating {
			position: absolute;
			bottom: 1rem;
			right: 1rem;
			column-gap: 5px;
			color: white;
		}

		.category {
			position: absolute;
			bottom: 1rem;
			left: 1rem;
			column-gap: 5px;
			color: white;
			border: 1px solid white;
			padding: 0.1rem 1rem;
			font-size: a.$twelve;
		}
	}
	.details {
		padding-top: 1rem;
		position: relative;

		.title {
			text-transform: capitalize;
			font-weight: 500;
			letter-spacing: normal;
			padding-bottom: 0;
			font-size: 1rem;
		}

		.price {
			font-size: 1.4rem;
			position: absolute;
			font-weight: 500;
			right: 0;
		}

		.location {
			color: rgb(105, 105, 105);
		}
	}
}
</style>
