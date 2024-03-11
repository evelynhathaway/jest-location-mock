import {describe, it, expect} from "vitest";
import {URLS_DO_NOT_MATCH} from "../messages.js";


describe("assigning", () => {
	it("should correctly handle assigning", () => {
		window.location.assign("/relative-url");
		expect(window.location).not.toBeAt("/");
		expect(window.location).toBeAt("/relative-url");
	});
});

describe("no actions", () => {
	it("should match default path", () => {
		expect(window.location).toBeAt("/");
		expect(window.location).not.toBeAt("/relative-url");
	});
});

describe("failures", () => {
	it("should fail saying the urls don't match", () => {
		expect(() => expect(window.location).toBeAt("/relative-url")).toThrow(URLS_DO_NOT_MATCH);
	});
});
