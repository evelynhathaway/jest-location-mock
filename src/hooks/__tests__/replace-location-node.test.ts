/** @jest-environment node */
describe("when window not defined", () => {
	it("should not have changed window", () => {
		expect(typeof window).toBe("undefined");
	});
});
