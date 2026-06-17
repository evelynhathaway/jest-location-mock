import eslintPluginEvelyn from "eslint-plugin-evelyn";

export default [
	{
		ignores: [
			"./lib/",
		],
	},
	...eslintPluginEvelyn.configs.base,
	...eslintPluginEvelyn.configs.node,
	...eslintPluginEvelyn.configs.typescript,
	...eslintPluginEvelyn.configs.esm,
];
