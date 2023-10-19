import {replaceHistory, replaceLocation} from "./hooks";


// Setup default hooks configuration
beforeEach(() => {
	replaceLocation();
	replaceHistory();
});
