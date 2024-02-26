export const useBookings = defineStore('booking', {
	state: () => ({
		bookings: [],
	}),
	actions: {
		addBookings(x) {
			this.bookings.push(x)
		},
		removeBookings(x) {
			const newBooking = this.bookings.filter(x => x.id !== x.this.bookings.id)
			return newBooking
		}
	},
})
