import {beforeAll, beforeEach} from "@jest/globals";
import {replaceHistory, replaceLocation, reset} from "./hooks/jest.ts";

// Setup default hooks configuration
beforeAll(() => {
	replaceLocation();
	replaceHistory();
});

beforeEach(() => {
	reset();
});
