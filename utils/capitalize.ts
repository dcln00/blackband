export default function (str: string) {
	const words = str.split(' ')
	const capitalizedWords = words.map(
		(word) => word.charAt(0).toUpperCase() + word.slice(1)
	)

	if (str.includes(' ')) {
		return capitalizedWords.join(' ')
	}

	return str.charAt(0).toUpperCase() + str.slice(1)
}
