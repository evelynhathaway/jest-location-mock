import {LocationMockRelative} from "./location-mock-relative";


beforeEach(() => {
	const locationMock = new LocationMockRelative("http://localhost/");
	jest.spyOn(locationMock, "assign");
	jest.spyOn(locationMock, "reload");
	jest.spyOn(locationMock, "replace");

	Object.defineProperty(
		window,
		"location",
		{
			value: locationMock,
		},
	);
});
