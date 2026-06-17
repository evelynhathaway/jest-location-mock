import {beforeAll, beforeEach} from "vitest";
import {replaceHistory, replaceLocation, reset} from "./hooks/vitest.ts";

// Setup default hooks configuration
beforeAll(() => {
	replaceLocation();
	replaceHistory();
});

beforeEach(() => {
	reset();
});
