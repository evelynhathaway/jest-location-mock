declare namespace jest {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface Matchers<R, T> {
		toBeAt(url: string, base?: string | URL): R;
		toHaveBeenAssigned(url?: string | URL, base?: string | URL): R;
	}
}
