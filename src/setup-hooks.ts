import {replaceHistory, replaceLocation, reset} from "./hooks";


// Setup default hooks configuration
beforeAll(() => {
	replaceLocation();
	replaceHistory();
});

beforeEach(() => {
	reset();
});
