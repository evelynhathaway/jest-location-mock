export default function config () {
	return {
		autoDetect: ["jest"],
		reportConsoleErrorAsError: true,
		lowCoverageThreshold: 99,
		env: {
			params: {
				runner: "--experimental-vm-modules",
			},
		},
	};
}
