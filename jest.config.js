// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
	preset: "ts-jest",
	clearMocks: true,
	collectCoverage: true,
	collectCoverageFrom: [
		"src/**/*",
		"!src/**/index.ts",
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
	verbose: true,
};
