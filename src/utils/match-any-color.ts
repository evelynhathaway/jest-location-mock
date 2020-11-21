import escapeRegex from "escape-string-regexp";


export const matchAnyColor = (input: string, splitBy = /\b/): RegExp => {
	// Optionally match any ANSI escape
	const ansiRegex = "(\\u{001B}\\[\\d+(;\\d+)*m)?";
	// Match ANSI escapes between any word boundary (or another `splitBy`) and the ends of the string
	return new RegExp(
		input
			.split(splitBy)
			.reduce(
				(accumulator, word) => `${accumulator}${escapeRegex(word)}${ansiRegex}`,
				ansiRegex,
			),
		"u", // Unicode support
	);
};
