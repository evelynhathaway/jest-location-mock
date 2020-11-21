export const urlify = (actual: string | URL, base: string | URL = "http://localhost/"): URL => actual instanceof URL ? actual : new URL(actual, base);
