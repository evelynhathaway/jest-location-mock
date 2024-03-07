import {it, expect} from "vitest";

it("should have spy for assign", () => {
	window.location.assign("/relative-url");
	expect(window.location.assign).toHaveBeenCalledWith("/relative-url");
});

it("should have spy for reload", () => {
	window.location.reload();
	expect(window.location.reload).toHaveBeenCalled();
});

it("should have spy for replace", () => {
	window.location.replace("/relative-url");
	expect(window.location.replace).toHaveBeenCalledWith("/relative-url");
});
