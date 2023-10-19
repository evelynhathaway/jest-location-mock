import {LocationMockRelative} from "../utils";

export const originalLocationRef: {current: Location | null} = {current: null};

export const replaceLocation = (): void => {
	// Do nothing if window is not defined
	// - Prevents an error when importing this mock in the setup file when some tests use the node test environment instead of JSDOM
	if (typeof window === "undefined") {
		return;
	}

	if (!originalLocationRef.current) {
		originalLocationRef.current = window.location;
	}

	// Set the base URL for relative URLs to `HOST` environment variable, defaults to localhost
	const locationMock = new LocationMockRelative(process.env.HOST || "http://localhost/");

	// Setup Jest spies on the methods for convenience and our matchers
	jest.spyOn(locationMock, "assign").mockName("window.location.assign");
	jest.spyOn(locationMock, "reload").mockName("window.location.reload");
	jest.spyOn(locationMock, "replace").mockName("window.location.replace");

	// Add the property to the Window
	// - Only some JSDOM versions support `delete` and `set`, and the browser allows for a setter to update the location
	//   so we use `Object.defineProperty`
	Object.defineProperty(
		window,
		"location",
		{
			get () {
				return locationMock;
			},
			set (value: string) {
				locationMock.href = value;
			},
			configurable: true,
			enumerable: true,
		},
	);
};
