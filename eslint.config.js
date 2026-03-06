import eslintPluginEvelyn from "eslint-plugin-evelyn";

export default [
	...eslintPluginEvelyn.configs.base,
	...eslintPluginEvelyn.configs.node,
	...eslintPluginEvelyn.configs.typescript,
];
