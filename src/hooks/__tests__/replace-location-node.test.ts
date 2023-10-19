/** @jest-environment node */
import {replaceLocation} from "../replace-location";

describe("replaceLocation()", () => {
	describe("when window not defined", () => {
		it("should not change window", () => {
			// Should already be run by jest setup, but let's run again for test verbosity and to report any errors
			replaceLocation();
			expect(typeof window).toBe("undefined");
		});
	});
});
