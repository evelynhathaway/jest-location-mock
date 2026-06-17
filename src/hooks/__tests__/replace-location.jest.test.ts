import {
	describe,
	it,
	expect,
	beforeEach,
	afterEach,
	beforeAll,
	afterAll,
	jest,
} from "@jest/globals";
import {testSuite} from "./test-suites/replace-location.test.ts";

testSuite({
	describe,
	it,
	expect,
	beforeEach,
	afterEach,
	beforeAll,
	afterAll,
	fn: jest.fn,
});
