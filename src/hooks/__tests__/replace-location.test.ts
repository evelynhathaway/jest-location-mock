import {describe, it, expect, beforeAll, afterAll, jest} from "@jest/globals";

describe("host environment variable", () => {
	// Runs before default hooks
	beforeAll(() => {
		process.env.HOST = "https://example.com";
	});
	afterAll(() => {
		delete process.env.HOST;
	});

	it("should include the host variable as the base", () => {
		window.location.assign("/relative-url");
		expect(window.location.href).toEqual("https://example.com/relative-url");
	});
});

describe("window.location property descriptor", () => {
	describe("setter", () => {
		it("should allow setting the href via the window.location setter", () => {
			expect(window.location.href).toEqual("http://localhost/");
			// TypeScript's built-in lib is confused about the type of the `window.location` setter
			window.location = "http://localhost/04ec3193-4942-4da4-92bf-5d807ec3907e" as unknown as Location & string;
			expect(window.location.href).toEqual("http://localhost/04ec3193-4942-4da4-92bf-5d807ec3907e");
			expect(window.location.pathname).toEqual("/04ec3193-4942-4da4-92bf-5d807ec3907e");
		});
	});
});

describe("window proxy", () => {
	it("should reflect non-location properties", () => {
		// Has properties
		expect(window.open).toEqual(expect.any(Function));

		// Can set and unset properties
		expect(window.onclick).toEqual(null);
		const clickHandler = jest.fn();
		// eslint-disable-next-line unicorn/prefer-add-event-listener
		window.onclick = clickHandler;
		expect(window.onclick).toEqual(clickHandler);
		// eslint-disable-next-line unicorn/prefer-add-event-listener
		window.onclick = null;
		expect(window.onclick).toEqual(null);

		// Can define properties that don't exist on the original window object
		expect((window as {customProperty?: string}).customProperty).toEqual(undefined);
		Object.defineProperty(window, "customProperty", {
			value: "33147d34-3514-402e-85af-dd32e3c10882",
			configurable: true,
			writable: true,
		});
		expect((window as {customProperty?: string}).customProperty).toEqual("33147d34-3514-402e-85af-dd32e3c10882");

		// Get own property descriptor
		expect(Object.getOwnPropertyDescriptor(window, "customProperty")).toEqual({
			value: "33147d34-3514-402e-85af-dd32e3c10882",
			configurable: true,
			writable: true,
			enumerable: false,
		});

		// Delete properties
		delete (window as {customProperty?: string}).customProperty;

		// Has properties
		expect("onclick" in window).toEqual(true);

		// Get prototype
		expect(Object.getPrototypeOf(window)).toEqual(expect.any(Object));

		// Get extensibility
		expect(Object.isExtensible(window)).toEqual(true);

		// Get own keys
		expect(Object.getOwnPropertyNames(window)).toEqual(expect.any(Array));
	});
});
