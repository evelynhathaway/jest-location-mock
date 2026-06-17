import type {
	describe as jestDescribe,
	it as jestIt,
	expect as jestExpect,
	beforeEach as jestBeforeEach,
	afterEach as jestAfterEach,
	beforeAll as jestBeforeAll,
	afterAll as jestAfterAll,
} from "@jest/globals";
import type {
	describe as vitestDescribe,
	it as vitestIt,
	expect as vitestExpect,
	beforeEach as vitestBeforeEach,
	afterEach as vitestAfterEach,
	beforeAll as vitestBeforeAll,
	afterAll as vitestAfterAll,
} from "vitest";

export interface TestRunnerDependencies {
	describe: typeof vitestDescribe | typeof jestDescribe;
	it: typeof vitestIt | typeof jestIt;
	expect: typeof vitestExpect | typeof jestExpect;
	beforeEach: typeof vitestBeforeEach | typeof jestBeforeEach;
	afterEach: typeof vitestAfterEach | typeof jestAfterEach;
	beforeAll: typeof vitestBeforeAll | typeof jestBeforeAll;
	afterAll: typeof vitestAfterAll | typeof jestAfterAll;
}
