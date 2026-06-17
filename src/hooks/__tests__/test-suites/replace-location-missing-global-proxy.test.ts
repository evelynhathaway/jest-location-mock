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
	describe("window._globalProxy", () => {
		it("should report an error if window._globalProxy is not defined", () => {
			globalThis.window = {} as unknown as Window & typeof globalThis;
			expect(() => replaceLocation()).toThrow("window._globalProxy is not defined. This mock relies on an internal JSDOM property that may have changed. Please report this issue to the jest-location-mock.");
		});
	});
};
