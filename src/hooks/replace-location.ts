import {LocationMockRelative} from "../utils";


export const replaceLocation = (): void => {
	// do nothing if window is not defined
	if (typeof window === 'undefined') {
		return;
	}
	// Set the base URL for relative URLs to `HOST` environment variable, defaults to localhost
	const locationMock = new LocationMockRelative(process.env.HOST || "http://localhost/");

	// Setup Jest spies on the methods for convenience and our matchers
	jest.spyOn(locationMock, "assign").mockName("window.location.assign");
	jest.spyOn(locationMock, "reload").mockName("window.location.reload");
	jest.spyOn(locationMock, "replace").mockName("window.location.replace");

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
