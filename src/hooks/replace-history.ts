import {originalLocationRef} from "./replace-location";

export const replaceHistory = (): void => {
	// Do nothing if window is not defined
	// - Prevents an error when importing this mock in the setup file when some tests use the node test environment instead of JSDOM
	if (typeof window === "undefined") {
		return;
	}

	const proxiedHistory = new Proxy(
		window.history,
		{
			get (target, property, receiver) {
				const realValue: unknown = Reflect.get(target, property, receiver);
				// If the property of window.history is a method, wrap it in a proxy to update the location mock
				if (realValue instanceof Function || jest.isMockFunction(realValue)) {
					return new Proxy(
						realValue,
						{
							apply (...args) {
								Reflect.apply(...args);
								// Update the location mock if the location was updated
								if (originalLocationRef.current && window.location.href !== originalLocationRef.current.href) {
									window.location.href = originalLocationRef.current.href;
								}
							},
						}
					);
				}
				return realValue;
			},
		}
	);

	// Setup Jest spies on the methods for convenience and our matchers
	jest.spyOn(proxiedHistory, "replaceState").mockName("window.history.replaceState");
	jest.spyOn(proxiedHistory, "pushState").mockName("window.history.pushState");
	jest.spyOn(proxiedHistory, "go").mockName("window.history.go");
	jest.spyOn(proxiedHistory, "back").mockName("window.history.back");
	jest.spyOn(proxiedHistory, "forward").mockName("window.history.forward");

	// Add the property to the Window
	Object.defineProperty(
		window,
		"history",
		{
			set: undefined,
			get () {
				return proxiedHistory;
			},
			configurable: true,
			enumerable: true,
		},
	);
};
