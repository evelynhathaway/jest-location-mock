import {defineConfig} from "vitest/config";

export default defineConfig({
	test: {
		watch: false,
		exclude: [
			"**/node_modules/**",
			"**/.git/**",
			"**/*.jest.test.{ts,tsx,js,jsx}",
			"**/test-suites/**",
		],
		environment: "jsdom",
		clearMocks: true,
		globals: false,
		reporters: [
			"verbose",
			...process.env.GITHUB_ACTIONS === "true" ? ["github-actions"] : [],
		],
		coverage: {
			enabled: true,
			include: [
				"src/**/*.{ts,tsx,js,jsx}",
			],
			exclude: [
				"src/**/*.jest.{ts,tsx,js,jsx}",
				"**/__tests__/**/*",
			],
			thresholds: {
				branches: 100,
				functions: 100,
				lines: 100,
				statements: 100,
			},
		},
		setupFiles: [
			"./config/vitest-setup.ts",
		],
	},
});
