import {LocationMockRelative} from "..";

describe("LocationMockRelative", () => {
	describe("when inputting a relative url", () => {
		it("should be able to assign", () => {
			const location = new LocationMockRelative("http://localhost/");
			expect(() => location.assign("/6caecb0d-1501-4c4f-973f-118c4f57cbfc")).not.toThrow();
			expect(location.href).toBe("http://localhost/6caecb0d-1501-4c4f-973f-118c4f57cbfc");
		});

		it("should be able to replace", () => {
			const location = new LocationMockRelative("http://localhost/");
			expect(() => location.replace("/82c43ab6-f34d-4577-bdaa-5dd33aaa9068")).not.toThrow();
			expect(location.href).toBe("http://localhost/82c43ab6-f34d-4577-bdaa-5dd33aaa9068");
		});
	});

	describe("when changing href", () => {
		it("should update all related properties", () => {
			const location = new LocationMockRelative("http://localhost/");
			location.href = "https://subdomain.example.com:8080/57e5ae98-7698-45d0-8ab6-7141e6842446?search=1#hash";

			expect(location.origin).toBe("https://subdomain.example.com:8080");
			expect(location.host).toBe("subdomain.example.com:8080");
			expect(location.port).toBe("8080");
			expect(location.pathname).toBe("/57e5ae98-7698-45d0-8ab6-7141e6842446");
			expect(location.search).toBe("?search=1");
			expect(location.hash).toBe("#hash");
		});
	});

	describe("when changing host", () => {
		it("should update the href", () => {
			const location = new LocationMockRelative("http://localhost/");
			location.host = "subdomain.example.com:8080";
			expect(location.href).toBe("http://subdomain.example.com:8080/");
		});
	});

	describe("when changing port", () => {
		it("should update the href", () => {
			const location = new LocationMockRelative("http://localhost/");
			location.port = "8080";
			expect(location.href).toBe("http://localhost:8080/");
		});
	});

	describe("when changing pathname", () => {
		it("should update the href", () => {
			const location = new LocationMockRelative("http://localhost/");
			location.pathname = "/9c6c08c0-e5be-40e7-99f6-ae7280503317";
			expect(location.href).toBe("http://localhost/9c6c08c0-e5be-40e7-99f6-ae7280503317");
		});
	});

	describe("when changing search", () => {
		it("should update the href", () => {
			const location = new LocationMockRelative("http://localhost/");
			location.search = "?search=1";
			expect(location.href).toBe("http://localhost/?search=1");
		});
	});

	describe("when changing hash", () => {
		it("should update the href", () => {
			const location = new LocationMockRelative("http://localhost/");
			location.hash = "#hash";
			expect(location.href).toBe("http://localhost/#hash");
		});
	});
});
