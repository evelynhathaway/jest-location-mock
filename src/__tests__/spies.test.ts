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

});
