import {URLS_DO_NOT_MATCH} from "../messages";

describe("expect().toBeAt()", () => {
	describe("assigning", () => {
		it("should correctly handle assigning", () => {
			window.location.assign("/edca87e3-d63b-46d0-9c5f-a79567f032d3");
			expect(window.location).not.toBeAt("/");
			expect(window.location).toBeAt("/edca87e3-d63b-46d0-9c5f-a79567f032d3");
		});
	});

	describe("no actions", () => {
		it("should match default path", () => {
			expect(window.location).toBeAt("/");
			expect(window.location).not.toBeAt("/8b660e93-8d69-4755-8645-95bbd0b551a4");
		});
	});

	describe("failures", () => {
		it("should fail saying the urls don't match", () => {
			expect(() => expect(window.location).toBeAt("/d1d56ddd-86d5-4e3a-9c5e-a38bf6383a57")).toThrow(URLS_DO_NOT_MATCH);
		});
	});
});
