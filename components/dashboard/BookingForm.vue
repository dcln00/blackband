<script setup lang="ts">
import { useBookings } from '../../stores/Bookings'
const props = defineProps(['price', 'closeModal', 'data'])
const supabase = useSupabaseClient()
// const mail = useMail()
const dayjs = useDayjs()
const store = useBookings()
const dates = ref()
const guestCount = ref(0)
const isLoading = ref(false)
const user = useSupabaseUser()
const errorMessage= ref('')

// .select(`checkin_date, checkout_date, price, guest_count, name, photo, location`)
// .eq('id', user.value.id)
// .single()

const guestAdd = computed(() => {
	if (guestCount.value > 9) {
		return
	}

	return guestCount.value++
})
const guestMinus = computed(() => {
	if (guestCount.value < 1) {
		return
	}

	return guestCount.value--
})

async function handleSubmit() {
	if (!dates.value || !guestCount.value) return

	isLoading.value = true

	const res = await $fetch('/api/mail/notifs', {
			method: 'post',
			body: {
				to: user.value?.email,
				subject: `You have added a new booking <${props.data?.title}>`,
				name: props.data?.title,
				checkin: dayjs(dates.value[0]).format('MMM DD, YYYY'),
				checkout: dayjs(dates.value[1]).format('MMM DD, YYYY'),
				guests: guestCount.value
			},
		})

		if(!res) {
			throw createError({
				statusCode: 500,
				statusMessage: 'Error sending mail',
			})

			errorMessage.value = 'Error Booking. Please Try Again'
			
			return
		}

		// @ts-expect-error
	const { error } = await supabase.from('bookings').insert({
		user_id: user.value?.id,
		price: props.price,
		name: props.data?.title,
		photo: props.data?.featuredImage?.node?.sourceUrl,
		location: props.data?.acfExperiences?.location || 'Accra, Ghana',
		checkin_date: dates.value[0],
		checkout_date: dates.value[1],
		guest_count: guestCount.value,
		notes: `user '${user.value?.email}' added a new booking`
	})

	if(error) {
		console.log(error)
		return
	}

	isLoading.value = false

	errorMessage.value = ''

	props.closeModal()

	await navigateTo('/dashboard/bookings')
}
</script>

<template lang="pug">
form(@submit.prevent="handleSubmit")
	.row
		.col-12
			.input-group.price-disabled
				input.form-control(
					type="text"
					:value="`$${price}`"
					placeholder="Price"
					aria-label="Price"
					aria-describedby="input-group-left"
					autoComplete="on"
					disabled
					)
				span#input-group-left-example.input-group-text PER PERSON

		.col-12
			.date-group
				Calendar(v-model="dates" selectionMode="range" :manualInput="false" :class="'date-cal'" :style="{width: '100%'}" placeholder="Pick Date" :input-style="{padding: '0.6em'}")

		.col-6.align-self-center
			label How many guests?

		.col-6.align-self-center
			.input-group
				span#input-group-left-example.input-group-text(@click="() => guestMinus" :style="{cursor: 'pointer'}") -
				input.form-control(
					type="text"
					:value="guestCount"
					placeholder="Price"
					aria-label="Price"
					aria-describedby="input-group-left"
					autoComplete="on"
					disabled
					)
				span#input-group-left-example.input-group-text(@click="() => guestAdd" :style="{cursor: 'pointer'}") +

		.col-12
			.button
				button(type="submit")
					div(v-if="!isLoading") Request to book
					Icon(name="svg-spinners:8-dots-rotate" size='1.5em' v-else)

		.col-12
			ErrorBound(:message="errorMessage" v-if="errorMessage")
</template>

<style lang="scss" scoped>
.price-disabled {
	margin-bottom: 1rem;
}
.input-group {
	.input-group-text {
		background-color: #e9ecef;
		border: 1px solid #e9ecef;
		border-left: none;
		font-size: 0.8rem;
	}

	input {
		padding: 0.6rem;
		position: relative;
		flex: 1 1 auto;
		width: 1%;
		min-width: 0;
		border: 1px solid #ededed;
		border-right: none;
		box-shadow: none;

		&[placeholder] {
			font-size: 0.8rem;
		}
	}
}

.date-group {
	margin-bottom: 1rem;

	.p-inputtext {
		padding: 0.6rem;
		width: 100% !important;
	}
}

.button {
	padding-top: 1rem;

	button {
		@include a.button;
		color: a.color(white);
		background-color: a.color(black);
		border-radius: a.$border-radius;
		padding: 0.8rem 2rem;
		display: block;
		width: 100%;
	}
}
</style>
