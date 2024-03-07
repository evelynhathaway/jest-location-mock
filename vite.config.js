import {defineConfig} from "vite";

const config = defineConfig({
	test: {
		environment: "jsdom",
		setupFiles: [
			"./config/vitest-setup.ts",
		],
	},
});

export default config;
