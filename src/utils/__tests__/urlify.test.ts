import {urlify} from "..";


it("should make strings url instances", () => {
	const url = urlify("http://localhost/");
	expect(url.href).toBe("http://localhost/");
});

it("should make keep url instances the same", () => {
	const url = urlify(new URL("http://localhost/another-url"));
	expect(url.href).toBe("http://localhost/another-url");
});
