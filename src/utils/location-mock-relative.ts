import {LocationMock} from "@jedmao/location";


export class LocationMockRelative extends LocationMock implements Location {
	assign (url: string): void {
		super.assign(this.makeAbsolute(url));
	}
	replace (url: string): void {
		super.replace(this.makeAbsolute(url));
	}
	private makeAbsolute (url: string) {
		return new URL(url, this.origin).href;
	}
}
