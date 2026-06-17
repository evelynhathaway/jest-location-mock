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
import {replaceHistory} from "../replace-history.jest.ts";
import {testSuite} from "./test-suites/replace-history-node.test.ts";

testSuite({
	describe,
	it,
	expect,
	beforeEach,
	afterEach,
	beforeAll,
	afterAll,
	replaceHistory,
});
