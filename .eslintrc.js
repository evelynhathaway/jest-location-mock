module.exports = {
	"plugins": [
		"evelyn",
	],

	"extends": [
		"plugin:evelyn/default",
		"plugin:evelyn/node",
		"plugin:evelyn/source",
	],

	"ignorePatterns": [
		"lib",
		"coverage",
	],

	"overrides": [
		{
			"files": [
				"**/*.ts",
			],
			"extends": [
				"plugin:evelyn/typescript",
			],
			"rules": {
				// When passing Location methods, TypeScript will warn that it's unbound, but we're not calling them
				"@typescript-eslint/unbound-method": "off",
			},
		},
	],
};
