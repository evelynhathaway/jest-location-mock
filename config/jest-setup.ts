// Default setup side-effects
import "../src";

// Enable fetch mock for use in React Router tests
// - Reference: https://reactrouter.com/en/main/routers/picking-a-router#testing
// - `Request` is undefined without this, even in Node.js v20
import "whatwg-fetch";

// Add matchers from Testing Library
import "@testing-library/jest-dom/jest-globals";

import {TextDecoder, TextEncoder} from "node:util";
import {afterEach} from "@jest/globals";
import {cleanup} from "@testing-library/react";

// Enable Node.js Text Encoder and TextDecoder in JSDOM environment for React Router tests
if (!globalThis.TextEncoder || !globalThis.TextDecoder) {
	globalThis.TextEncoder = TextEncoder;
	globalThis.TextDecoder = TextDecoder;
}

afterEach(() => {
	cleanup();
});
