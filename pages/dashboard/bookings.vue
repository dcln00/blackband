<script setup lang="ts">
const store = useBookings()

useHead({
	titleTemplate: `Bookings - %s`
})
</script>

<template lang="pug">
div 
	DashTitle(title="bookings")
	section#bookings-err.container(v-if="!store.bookings.length")
		ErrorBound(message="You currently have no bookings")
	section#bookings.container
		.booking.d-flex(v-for="item in store.bookings" :key="item.price")
			.photo.d-flex.align-items-center.justify-content-center
				Icon(v-if="!item.photo" name="material-symbols:broken-image-outline")
				NuxtImg(v-else :src="item.photo")
			.details
				.title {{ item.name }}
				.date(v-if="!item.dates[1]") {{ $dayjs(item.dates.at(0)).format('MMM DD, YYYY') }}
				.date(v-else) {{ $dayjs(item.dates.at(0)).format('MMM DD') }} - {{ $dayjs(item.dates.at(1)).format('DD, YYYY') }}
				.location {{ item.location }}
</template>

<style lang="scss">
@use '../../assets/style/abstracts' as a;

#bookings {

	.booking {
		column-gap: 15px;
		padding-bottom: 1.5rem;

		.photo {
			border-radius: a.$border-radius;
			width: 65px;
			height: 65px;
			background-color: #ededed;
			overflow: hidden;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		.details {

			.title {
				padding-bottom: .5rem;
				text-transform: capitalize;
				letter-spacing: 0;
				font-size: 1rem;
				font-weight: 500;
			}

			.date {
				font-size: a.$twelve;
				text-transform: capitalize;
			}

			.location {
				font-size: a.$twelve;
				text-transform: capitalize;
				color: rgb(83, 83, 83);
			}
		}
	}
}
</style>