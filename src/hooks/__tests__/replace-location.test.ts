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
		expect(window.open).toEqual(expect.any(Function));
		expect(window.onclick).toEqual(null);
		const clickHandler = jest.fn();
		// eslint-disable-next-line unicorn/prefer-add-event-listener
		window.onclick = clickHandler;
		expect(window.onclick).toEqual(clickHandler);
	});
});
