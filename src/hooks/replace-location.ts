import {LocationMockRelative} from "../utils";

// export const locationMockRef: {current: LocationMockRelative | null} = {current: null};

declare global {
	var _locationMock: LocationMockRelative | undefined;
	var _originalLocation: Location | undefined;
}

export const replaceLocation = (): void => {
	// Do nothing if window is not defined
	// - Prevents an error when importing this mock in the setup file when some tests use the node test environment instead of JSDOM
	if (typeof window === "undefined") {
		return;
	}

	const locationMock = new LocationMockRelative(process.env.HOST || "http://localhost/");
	globalThis._locationMock = locationMock;

	// Setup Jest spies on the methods for convenience and our matchers
	jest.spyOn(locationMock, "assign").mockName("window.location.assign");
	jest.spyOn(locationMock, "reload").mockName("window.location.reload");
	jest.spyOn(locationMock, "replace").mockName("window.location.replace");
};
