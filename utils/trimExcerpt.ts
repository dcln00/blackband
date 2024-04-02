export default function (sentence: string, num = 30) {
	const words = sentence.split(" ")

	const slicedWords = words.slice(0, num)

	const slicedSentence = slicedWords.join(" ")

	if(slicedWords.length < num) return slicedSentence

	return `${slicedSentence}...`;
}
