/** @jest-environment node */
import {describe, it, expect} from "@jest/globals";
import {replaceLocation} from "../replace-location";

describe("window._globalProxy", () => {
	it("should report an error if window._globalProxy is not defined", () => {
		// eslint-disable-next-line no-global-assign
		window = {} as unknown as Window & typeof globalThis;
		expect(() => replaceLocation()).toThrow("window._globalProxy is not defined. This mock relies on an internal JSDOM property that may have changed. Please report this issue to the jest-location-mock.");
	});
});
