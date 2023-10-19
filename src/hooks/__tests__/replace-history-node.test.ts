/** @jest-environment node */
import {replaceHistory} from "../replace-history";

describe("replaceHistory()", () => {
	describe("when window not defined", () => {
		it("should not change window", () => {
			// Should already be run by jest setup, but let's run again for test verbosity and to report any errors
			replaceHistory();
			expect(typeof window).toBe("undefined");
		});
	});
});
