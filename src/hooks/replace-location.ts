import {getHost} from "../utils/get-host.ts";
import {LocationMockRelative, makeAbsolute} from "../utils/location-mock-relative.ts";

export const originalLocationRef: {current: Location | null} = {current: null};

export const replaceLocation = (spyOn: (object: unknown, method: string) => {mockName: (name: string) => void}): void => {
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

	// Setup spies on the methods for convenience
	spyOn(locationMock, "assign").mockName("window.location.assign");
	spyOn(locationMock, "reload").mockName("window.location.reload");
	spyOn(locationMock, "replace").mockName("window.location.replace");

	const mockedWindow = new Proxy(window, {
		get (target, property, receiver) {
			if (property === "location") {
				return locationMock;
			}
			return Reflect.get(target, property, receiver) as unknown;
		},
		set (target, property, value) {
			if (property === "location") {
				locationMock.href = makeAbsolute(value as string, locationMock.origin);
				return true;
			}
			// Cannot add `receiver` argument or it will always return false as if it's non configurable
			return Reflect.set(target, property, value);
		},
	});

	const mockedGlobalThis = new Proxy(globalThis, {
		get (target, property, receiver) {
			if (property === "location") {
				return locationMock;
			}
			return Reflect.get(target, property, receiver) as unknown;
		},
		set (target, property, value) {
			if (property === "location") {
				locationMock.href = makeAbsolute(value as string, locationMock.origin);
				return true;
			}
			// Cannot add `receiver` argument or it will always return false as if it's non configurable
			return Reflect.set(target, property, value);
		},
	});

	// Shadow `window` via internal JSDOM property (works for Jest)
	// I am unsure how long this internal property will work, but I cannot find any other way to shadow the
	// unconfigurable `window.location` property in JSDOM v21+
	// https://github.com/jsdom/jsdom/blob/57bbf9a5c2bd32d3c811068480dee3cc8da3dd34/lib/jsdom/browser/Window.js#L54-L60
	(window as {_globalProxy?: Window})._globalProxy = mockedWindow;
	// Replace `window` (works for Vitest)
	// eslint-disable-next-line no-global-assign
	window = mockedWindow;

	// Shadow `globalThis`
	// - Cannot define property `location` on `globalThis` directly since it's non-configurable
	// - Cannot assign `globalThis` to a new object since it's non-writable
	Object.defineProperty(globalThis, "globalThis", {
		value: mockedGlobalThis,
	});
};
