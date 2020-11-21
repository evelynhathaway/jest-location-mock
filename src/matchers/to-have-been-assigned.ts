import spyMatchers from "expect/build/spyMatchers";
import {urlify} from "../utils";


const toHaveBeenCalled = spyMatchers.toHaveBeenCalled as (this: jest.MatcherState, received: unknown) => jest.CustomMatcherResult;
const toHaveBeenCalledWith = spyMatchers.toHaveBeenCalledWith as (this: jest.MatcherState, received: unknown, actual: unknown) => jest.CustomMatcherResult;

export const toHaveBeenAssigned: jest.CustomMatcher = function (
	received: Location,
	actual?: string | URL,
	base?: string | URL,
) {
	if (!actual) {
		return toHaveBeenCalled.call(this, received.assign);
	}

	const actualURL = urlify(actual, base);
	const {mock} = received.assign as jest.Mock<void, [string | URL]>;
	mock.calls = mock.calls.map(([url]) => [urlify(url).href]);
	return toHaveBeenCalledWith.call(this, received.assign, actualURL.href);
};
