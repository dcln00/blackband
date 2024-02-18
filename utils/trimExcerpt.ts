export default function (sentence, num = 30) {
	const words = sentence.split(" ");

	const slicedWords = words.slice(0, num);

	const slicedSentence = slicedWords.join(" ");

	return `${slicedSentence}...`;
}
