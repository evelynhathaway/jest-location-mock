import {describe, beforeAll, it, expect} from "vitest";

describe("host environment variable", () => {
	// Runs before default hooks
	beforeAll(() => {
		process.env.HOST = "https://example.com";
	});

	it("should include the host variable as the base", () => {
		window.location.assign("/relative-url");
		expect(window.location.href).toEqual("https://example.com/relative-url");
	});
});
