import {
	describe,
	it,
	expect,
	beforeEach,
	afterEach,
	beforeAll,
	afterAll,
	vi,
} from "vitest";
import {testSuite} from "./test-suites/replace-location";

testSuite({
	describe,
	it,
	expect,
	beforeEach,
	afterEach,
	beforeAll,
	afterAll,
	fn: vi.fn,
});
