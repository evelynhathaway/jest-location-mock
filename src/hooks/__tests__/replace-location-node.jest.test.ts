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
import {testSuite} from "./test-suites/replace-location-node.test";

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
