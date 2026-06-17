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
import {replaceHistory} from "../replace-history.vitest.ts";
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
