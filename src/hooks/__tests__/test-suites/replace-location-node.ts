import type {TestRunnerDependencies} from "../../../../config/create-test-suite";
import type {replaceLocation as replaceLocationType} from "../../replace-location.jest";

export const testSuite = ({
	describe,
	it,
	expect,
	replaceLocation,
}: TestRunnerDependencies & {
	replaceLocation: typeof replaceLocationType;
}) => {
	describe("replaceLocation()", () => {
		describe("when window not defined", () => {
			it("should not change window", () => {
				// Should already be run by jest setup, but let's run again for test verbosity and to report any errors
				replaceLocation();
				expect(typeof window).toBe("undefined");
			});
		});
	});
};
