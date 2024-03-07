import {describe, it, expect} from "vitest";
import {LocationMockRelative} from "..";


describe("when inputting a relative url", () => {
	it("should be able to assign", () => {
		const location = new LocationMockRelative("http://localhost/");
		expect(() => location.assign("/relative-url")).not.toThrow();
	});

	it("should be able to replace", () => {
		const location = new LocationMockRelative("http://localhost/");
		expect(() => location.replace("/relative-url")).not.toThrow();
	});
});
