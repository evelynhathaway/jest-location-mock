import {LocationMockRelative} from "../location-mock-relative";


it("should be able to assigned with a relative url", () => {
	const location = new LocationMockRelative("http://localhost/");
	expect(() => location.assign("/relative-url")).not.toThrow();
});

it("should be able to assigned with a replace url", () => {
	const location = new LocationMockRelative("http://localhost/");
	expect(() => location.replace("/relative-url")).not.toThrow();
});
