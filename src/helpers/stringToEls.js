import { chords, songParts } from "../config/prod";

export const stringToEls = (string) => {

	if (string.length === 0) {
		return string;
	}

	let elArr = string.split('\n\n');
	elArr = elArr.map(item => {
		let strings = item.split('\n');
		strings = strings.map(string => {


			return { type: stringType(string), string }

		});

		return { start: 0, end: 1, strings };
	})

	return elArr;
}

function stringType(str) {
	const reducer = (prev, current) => {
		if (!prev === true) {

			return str.includes(current);
		}
		return prev;
	}

	switch (true) {
		case chords.reduce(reducer, false):
			return 'chords'

		case songParts.reduce(reducer, false):
			return 'title'

		default:
			return 'text'
	}
}