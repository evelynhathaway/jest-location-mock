import eslintPluginEvelyn from "eslint-plugin-evelyn";

export default [
	{
		ignores: [
			"./dist/",
		],
	},
	...eslintPluginEvelyn.configs.base,
	...eslintPluginEvelyn.configs.node,
	...eslintPluginEvelyn.configs.typescript,
	...eslintPluginEvelyn.configs.esm,
];
