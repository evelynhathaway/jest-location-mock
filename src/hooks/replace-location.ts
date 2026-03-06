import {LocationMockRelative} from "../utils";
import {getHost} from "../utils/get-host";

export const originalLocationRef: {current: Location | null} = {current: null};

export const replaceLocation = (): void => {
	// Do nothing if window is not defined
	// - Prevents an error when importing this mock in the setup file when some tests use the node test environment instead of JSDOM
	if (typeof window === "undefined") {
		return;
	}

	if (!(window as {_globalProxy?: Window})._globalProxy) {
		throw new Error("window._globalProxy is not defined. This mock relies on an internal JSDOM property that may have changed. Please report this issue to the jest-location-mock.");
	}

	originalLocationRef.current = window.location;

	// Set the base URL for relative URLs to `HOST` environment variable, defaults to localhost
	const locationMock = new LocationMockRelative(getHost());

	// Setup Jest spies on the methods for convenience and our matchers
	jest.spyOn(locationMock, "assign").mockName("window.location.assign");
	jest.spyOn(locationMock, "reload").mockName("window.location.reload");
	jest.spyOn(locationMock, "replace").mockName("window.location.replace");

	const mockedWindow = new Proxy(window, {
		get (target, property, receiver) {
			if (property === "location") {
				return locationMock;
			}
			return Reflect.get(target, property, receiver) as unknown;
		},
		set (target, property, value) {
			if (property === "location") {
				locationMock.href = value as string;
				return true;
			}
			// Cannot add `receiver` argument or it will always return false as if it's non configurable
			return Reflect.set(target, property, value);
		},
	});
	// I am unsure how long this internal property will work, but I cannot find any other way to shadow the
	// unconfigurable `window.location` property in JSDOM v21+
	// https://github.com/jsdom/jsdom/blob/57bbf9a5c2bd32d3c811068480dee3cc8da3dd34/lib/jsdom/browser/Window.js#L54-L60
	(window as {_globalProxy?: Window})._globalProxy = mockedWindow;
};
