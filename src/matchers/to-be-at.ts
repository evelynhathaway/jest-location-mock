import {urlify} from "../utils/index.js";
import {URLS_DO_NOT_MATCH} from "./messages.js";


export const toBeAt = function (
	received: URL,
	actual: string | URL,
	base?: string | URL,
) {
	const actualURL = urlify(actual, base);
	return {
		pass: received.href === actualURL.href,
		message: () => URLS_DO_NOT_MATCH,
		actual: received.href,
		expected: actualURL.href,
	};
};
