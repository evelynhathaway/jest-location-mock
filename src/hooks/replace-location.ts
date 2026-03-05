import {LocationMockRelative} from "../utils";

export const originalLocationRef: {current: Location | null} = {current: null};

declare global {
	var _globalProxy: Window | undefined;
}

export const replaceLocation = (): void => {
	// Do nothing if window is not defined
	// - Prevents an error when importing this mock in the setup file when some tests use the node test environment instead of JSDOM
	if (typeof window === "undefined") {
		return;
	}

	if (!originalLocationRef.current) {
		originalLocationRef.current = window.location;
	}

	const locationMock = new LocationMockRelative(process.env.HOST || "http://localhost/");

	// Setup Jest spies on the methods for convenience and our matchers
	jest.spyOn(locationMock, "assign").mockName("window.location.assign");
	jest.spyOn(locationMock, "reload").mockName("window.location.reload");
	jest.spyOn(locationMock, "replace").mockName("window.location.replace");

	const mockedWindow = new Proxy(window, {
		get (target, property, receiver) {
			if (property === "location") {
				// console.log("Getting window.location");
				return locationMock;
			}
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			return Reflect.get(target, property, receiver);
		},
		set (target, property, value, receiver) {
			if (property === "location") {
				// console.log("Setting window.location");
				locationMock.href = value as string;
				return true;
			}
			return Reflect.set(target, property, value, receiver);
		},
	});
	// TODO: more proper emulation of JSDOM's internal VM logic
	// window._globalObject = mockedWindow;
	window._globalProxy = mockedWindow;
};
