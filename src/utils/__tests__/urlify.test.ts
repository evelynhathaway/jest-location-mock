import {it, expect} from "vitest";
import {urlify} from "../index.js";


it("should make strings url instances", () => {
	const url = urlify("http://localhost/");
	expect(url.href).toBe("http://localhost/");
});

it("should make keep url instances the same", () => {
	const url = urlify(new URL("http://localhost/another-url"));
	expect(url.href).toBe("http://localhost/another-url");
});
