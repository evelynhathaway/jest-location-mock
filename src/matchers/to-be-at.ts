import {diffStringsUnified} from "jest-diff";
import {urlify} from "../utils";
import {URLS_DO_NOT_MATCH} from "./messages";


export const toBeAt: jest.CustomMatcher = function (
	received: URL,
	actual: string | URL,
	base?: string | URL,
) {
	const actualURL = urlify(actual, base);
	return {
		pass: received.href === actualURL.href,
		message: () => `${URLS_DO_NOT_MATCH}\n${diffStringsUnified(received.href, actualURL.href)}`,
	};
};
