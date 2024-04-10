<script setup lang="ts">
const store = useBookings()
const supabase = useSupabaseClient()
const user = useSupabaseUser()

useHead({
	titleTemplate: `Bookings - %s` 
})

const { data, error } = await supabase
	.from('bookings')
	.select(`photo, name, location, guest_count, checkin_date, checkout_date, price`)
	.eq('user_id', user.value?.id)
</script>

<template lang="pug">
div 
	DashTitle(title="bookings")
	section#bookings-err.container(v-if="!data.length")
		ErrorBound(message="You currently have no bookings")
	section#bookings.container
		.booking.d-flex(v-for="item in data.reverse()" :key="item.price")
			.photo
				Icon(v-if="!item.photo" name="material-symbols:broken-image-outline")
				NuxtImg(v-else :src="item.photo")
			.details
				.title {{ item.name }}
				.date(v-if="!item.checkout_date") {{ $dayjs(item.checkin_date).format('MMM DD, YYYY') }}
				.date(v-else) {{ $dayjs(item.checkin_date).format('MMM DD') }} - {{ $dayjs(item.checkout_date).format('DD, YYYY') }}
				.location {{ item.location }}
</template>

<style lang="scss">
#bookings {

	.booking {
		column-gap: 15px;
		padding-bottom: 1.5rem;

		.photo {
			border-radius: a.$border-radius;
			width: 65px;
			height: 65px;
			aspect-ratio: 1;
			background-color: #ededed;
			overflow: hidden;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		.details {
			width: 70%;

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