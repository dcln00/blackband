export default function (sentence: string, num = 30) {
	const words = sentence.split(" ");

	const slicedWords = words.slice(0, num);

	const slicedSentence = slicedWords.join(" ");

	return `${slicedSentence}...`;
}
