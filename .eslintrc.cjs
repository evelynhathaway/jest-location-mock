module.exports = {
	"plugins": [
		"evelyn",
	],

	"extends": [
		"plugin:evelyn/default",
		"plugin:evelyn/typescript",
	],

	"ignorePatterns": [
		"lib",
		"coverage",
	],

	"rules": {
		// When passing Location methods, TypeScript will warn that it's unbound, but we're not calling them
		"@typescript-eslint/unbound-method": "off",
	},
};
