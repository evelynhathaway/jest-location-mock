// import chalk from "chalk";

import {matchAnyColor} from "../../utils/match-any-color";


describe("empty arguments", () => {
	it("should assert only on call", () => {
		expect(window.location).not.toHaveBeenAssigned();
		window.location.assign("/");
		expect(window.location).toHaveBeenAssigned();
	});

	describe("failures", () => {
		it("should fail saying the function was never called", () => {
			expect(() => expect(window.location).toHaveBeenAssigned()).toThrow();
		});
	});
});

describe("string argument", () => {
	it("should assert only on call of correct url", () => {
		expect(window.location).not.toHaveBeenAssigned("/");
		window.location.assign("/");
		expect(window.location).not.toHaveBeenAssigned("/relative-url");
		expect(window.location).toHaveBeenAssigned("/");
	});

	describe("failures", () => {
		it("should fail with correct hint in message", () => {
			expect(
				() => expect(window.location).toHaveBeenAssigned("/")
			).toThrow(matchAnyColor("window.location.assign"));
		});

		it("should fail saying the function was never called", () => {
			expect(
				() => expect(window.location).toHaveBeenAssigned("/")
			).toThrow(matchAnyColor("Number of calls: 0"));
		});

		it("should fail saying the expected wasn't matched", () => {
			window.location.assign("/");
			expect(
				() => expect(window.location).toHaveBeenAssigned("/relative-url")
			).toThrow(matchAnyColor("http://localhost/relative-url"));
		});
	});
});
