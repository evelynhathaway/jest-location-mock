import type {TestRunnerDependencies} from "../../../../config/create-test-suite.ts";
import type {replaceHistory as replaceHistoryType} from "../../replace-history.jest.ts";

export const testSuite = ({
	describe,
	it,
	expect,
	replaceHistory,
}: TestRunnerDependencies & {
	replaceHistory: typeof replaceHistoryType;
}) => {
	describe("replaceHistory()", () => {
		describe("when window not defined", () => {
			it("should not change window", () => {
				// Should already be run by jest setup, but let's run again for test verbosity and to report any errors
				replaceHistory();
				expect(typeof window).toBe("undefined");
			});
		});
	});
};
