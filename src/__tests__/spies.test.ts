describe("window.location", () => {
	it("should have spy for assign()", () => {
		window.location.assign("/b3a06294-6e91-44c4-9a16-e8f328105940");
		expect(window.location.assign).toHaveBeenCalledWith("/b3a06294-6e91-44c4-9a16-e8f328105940");
	});

	it("should have spy for reload()", () => {
		window.location.reload();
		expect(window.location.reload).toHaveBeenCalled();
	});

	it("should have spy for replace()", () => {
		window.location.replace("/181bcd32-84ee-4cf2-ad3c-f12363293050");
		expect(window.location.replace).toHaveBeenCalledWith("/181bcd32-84ee-4cf2-ad3c-f12363293050");
	});
});

describe("window.history", () => {
	it("should have spy for replaceState()", () => {
		window.history.replaceState(null, "", "/c25b924e-163f-4b8a-936e-224229fbbd4b");
		expect(window.history.replaceState).toHaveBeenCalledWith(null, "", "/c25b924e-163f-4b8a-936e-224229fbbd4b");
	});

	it("should have spy() for pushState", () => {
		window.history.pushState(null, "", "/c25b924e-163f-4b8a-936e-224229fbbd4b");
		expect(window.history.pushState).toHaveBeenCalledWith(null, "", "/c25b924e-163f-4b8a-936e-224229fbbd4b");
	});

	it("should have spy for go()", () => {
		window.history.go(-2);
		expect(window.history.go).toHaveBeenCalledWith(-2);
	});

	it("should have spy for back()", () => {
		window.history.back();
		expect(window.history.back).toHaveBeenCalled();
	});

	it("should have spy for forward()", () => {
		window.history.forward();
		expect(window.history.forward).toHaveBeenCalled();
	});
});
