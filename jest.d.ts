/// <reference types="jest">

declare namespace jest {
	// Interface must match the interface it will merge with
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface Matchers<R, T> {
		toBeAt(url: string | URL, base?: string | URL): R;
	}
}
