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
import {replaceHistory} from "../replace-history.jest";
import {testSuite} from "./test-suites/replace-history-node.test";

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
