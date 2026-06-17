// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

export default {
	preset: "ts-jest",
	testPathIgnorePatterns: [
		String.raw`\.vitest\.test\.(ts|tsx|js|jsx)$`,
		"/test-suites/",
	],
	clearMocks: true,
	collectCoverage: true,
	collectCoverageFrom: [
		"src/**/*",
		"!src/**/vitest.ts",
		"!src/**/*.vitest.{ts,tsx,js,jsx}",
		"!**/__tests__/**/*",
	],
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},
	testEnvironment: "jsdom",
	setupFilesAfterEnv: [
		"./config/jest-setup.ts",
	],
	verbose: true,
	injectGlobals: false,
};
