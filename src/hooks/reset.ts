import {getHost} from "../utils/get-host";

export const reset = (): void => {
	// Do nothing if window is not defined
	// - Prevents an error when importing this mock in the setup file when some tests use the node test environment instead of JSDOM
	if (typeof window === "undefined") {
		return;
	}

	// Reset history
	// - `back()` and `forward()` do not change the location in JSDOM, therefore we're don't need to pop entries off
	//   - This may change as the JSDOM improves or the potentially if the scope of the project expands to replacing
	//     JSDOM's mocks with our own that are better suited to single page application testing
	// - Related: https://github.com/jsdom/jsdom/issues/1565
	window.history.pushState(null, "", "/");

	// Reset location
	window.location.href = getHost();
};
