export const initials = (name: string) => {
	const words = name.split(' ')
	const initials = words.map((word) => word.charAt(0).toUpperCase())
	return initials.join('.')
}

export const greeting = (): string => {
	const currentHour = new Date().getHours()

	const morningStart = 5
	const afternoonStart = 12
	const eveningStart = 16

	if (currentHour >= morningStart && currentHour < afternoonStart) {
		return 'Good Morning'
	} else if (currentHour >= afternoonStart && currentHour < eveningStart) {
		return 'Good Afternoon'
	} else {
		return 'Good Evening'
	}
}
