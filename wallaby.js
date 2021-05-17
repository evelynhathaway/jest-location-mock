module.exports = function () {
	return {
		autoDetect: true,
		hints: {
			ignoreCoverageForFile: /ignore file coverage|istanbul ignore file/,
		},
		reportConsoleErrorAsError: true,
		lowCoverageThreshold: 99,
	};
};
