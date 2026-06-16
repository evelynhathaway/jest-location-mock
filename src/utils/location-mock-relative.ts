import {LocationMock} from "@jedmao/location";

export const makeAbsolute = (url: string, origin: string) => new URL(url, origin).href;

export class LocationMockRelative extends LocationMock implements Location {
	assign (url: string): void {
		super.assign(makeAbsolute(url, this.origin));
	}
	replace (url: string): void {
		super.replace(makeAbsolute(url, this.origin));
	}
}
