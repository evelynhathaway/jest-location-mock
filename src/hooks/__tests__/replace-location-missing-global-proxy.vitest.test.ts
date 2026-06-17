/** @vitest-environment node */
import {
	describe,
	it,
	expect,
	beforeEach,
	afterEach,
	beforeAll,
	afterAll,
} from "vitest";
import {replaceLocation} from "../replace-location.vitest";
import {testSuite} from "./test-suites/replace-location-missing-global-proxy";

testSuite({
	describe,
	it,
	expect,
	beforeEach,
	afterEach,
	beforeAll,
	afterAll,
	replaceLocation,
});
