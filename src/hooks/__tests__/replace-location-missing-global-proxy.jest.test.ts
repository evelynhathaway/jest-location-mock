/** @jest-environment node */
import {
	describe,
	it,
	expect,
	beforeEach,
	afterEach,
	beforeAll,
	afterAll,
} from "@jest/globals";
import {replaceLocation} from "../replace-location.jest.ts";
import {testSuite} from "./test-suites/replace-location-missing-global-proxy.test.ts";

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
