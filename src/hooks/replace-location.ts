import {vi} from "vitest";
import {LocationMockRelative} from "../utils/index.js";


export const replaceLocation = (): void => {
	// Do nothing if window is not defined
	// - Prevents an error when importing this mock in the setup file when some tests use the node test environment instead of JSDOM
	if (typeof window === "undefined") {
		return;
	}
	// Set the base URL for relative URLs to `HOST` environment variable, defaults to localhost
	const locationMock = new LocationMockRelative(process.env.HOST || "http://localhost/");

	// Setup Vitest spies on the methods for convenience and our matchers
	vi.spyOn(locationMock, "assign").mockName("window.location.assign");
	vi.spyOn(locationMock, "reload").mockName("window.location.reload");
	vi.spyOn(locationMock, "replace").mockName("window.location.replace");

	// Add the property to the Window
	// - Only some JSDOM versions support `delete` and `set`, so we use `Object.defineProperty`
	Object.defineProperty(
		window,
		"location",
		{
			value: locationMock,
			configurable: true,
			enumerable: true,
			writable: true, // Variance from spec, needed for some reason?
		},
	);
};
