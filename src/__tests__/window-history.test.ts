describe("window.history", () => {
	describe("replaceState()", () => {
		it("should update location mock", () => {
			expect(window.location).toBeAt("/");
			window.history.replaceState(null, "", "/0e37bca8-b8e3-49ee-8ac6-57e50c2884d3");
			expect(window.location).toBeAt("/0e37bca8-b8e3-49ee-8ac6-57e50c2884d3");
		});
	});

	describe("pushState()", () => {
		it("should update location mock", () => {
			expect(window.location).toBeAt("/");
			window.history.pushState(null, "", "/e8bf1e04-46e9-4f30-abcb-320412243ea2");
			expect(window.location).toBeAt("/e8bf1e04-46e9-4f30-abcb-320412243ea2");
		});
	});

	// Skipped as JSDOM doesn't handle history traversal well
	// - `back()` and `forward()` do not change the location in JSDOM, therefore we're not currently testing for
	//   handling updating the mock
	//   - This may change as the JSDOM improves or the potentially if the scope of the project expands to replacing
	//     JSDOM's mocks with our own that are better suited to single page application testing
	// - Related: https://github.com/jsdom/jsdom/issues/1565
	describe.skip("history", () => {
		describe("go()", () => {
			it("should update location mock", () => {
				expect(window.location).toBeAt("/");
				window.history.pushState(null, "", "/04d333bd-4694-49be-aa25-d7e92515eabb");
				expect(window.location).toBeAt("/04d333bd-4694-49be-aa25-d7e92515eabb");
				window.history.pushState(null, "", "/ca1ed895-b590-421e-be9b-84ef2a5aa5fd");
				expect(window.location).toBeAt("/ca1ed895-b590-421e-be9b-84ef2a5aa5fd");
				window.history.go(-1);
				expect(window.location).toBeAt("/04d333bd-4694-49be-aa25-d7e92515eabb");
				window.history.go(-1);
				expect(window.location).toBeAt("/");
				window.history.go(2);
				expect(window.location).toBeAt("/ca1ed895-b590-421e-be9b-84ef2a5aa5fd");
			});
		});
		describe("back() and forward()", () => {
			it("should update location mock", () => {
				expect(window.location).toBeAt("/");
				window.history.pushState(null, "", "/9330c6b2-153d-411f-ac67-8adb74b614f0");
				expect(window.location).toBeAt("/9330c6b2-153d-411f-ac67-8adb74b614f0");
				window.history.back();
				expect(window.location).toBeAt("/");
				window.history.forward();
				expect(window.location).toBeAt("/9330c6b2-153d-411f-ac67-8adb74b614f0");
				// Forward cannot progress past the most recent state, so this should should do nothing compared to above
				window.history.forward();
				expect(window.location).toBeAt("/9330c6b2-153d-411f-ac67-8adb74b614f0");
			});
		});
	});
});
