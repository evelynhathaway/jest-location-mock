module.exports = function () {
	return {
		autoDetect: ["vitest", "jest"],
		hints: {
			ignoreCoverageForFile: /ignore file coverage|istanbul ignore file/,
		},
		reportConsoleErrorAsError: true,
		lowCoverageThreshold: 99,
	};
};
