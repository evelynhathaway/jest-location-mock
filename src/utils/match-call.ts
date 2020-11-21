import {urlify} from "./urlify";


export const matchCall = (mock: jest.MockContext<unknown, [string | URL]>, actualURL: URL): boolean => (
	mock.calls.some(([url]) => urlify(url).href === actualURL.href)
);
