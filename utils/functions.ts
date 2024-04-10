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

export const capitalize = (str: string) => {
	const words = str.split(' ')
	const capitalizedWords = words.map(
		(word) => word.charAt(0).toUpperCase() + word.slice(1)
	)

	if (str.includes(' ')) {
		return capitalizedWords.join(' ')
	}

	return str.charAt(0).toUpperCase() + str.slice(1)
}

export const trimExcerpt = (sentence: string, num = 30) => {
	const words = sentence.split(" ")

	const slicedWords = words.slice(0, num)

	const slicedSentence = slicedWords.join(" ")

	if(slicedWords.length < num) return slicedSentence

	return `${slicedSentence}...`;
}
