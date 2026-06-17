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
import {replaceLocation} from "../replace-location.jest";
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
