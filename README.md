<div align="center">

<img alt="Jest Location Mock icon" width="128" height="128" align="center" src=".github/icon.png"/>

# Jest Location Mock

**Jest hooks for JSDOM location mock**

[![npm version](https://badgen.net/npm/v/jest-location-mock?icon=npm)](https://www.npmjs.com/package/jest-location-mock)
[![check status](https://badgen.net/github/checks/evelynhathaway/jest-location-mock/main?icon=github)](https://github.com/evelynhathaway/jest-location-mock/actions)
[![license: MIT](https://badgen.net/badge/license/MIT/blue)](/LICENSE)

</div>

## Description

Ever gotten the following error when using `window.location = newHref`, `window.location.assign()`, `.reload()`, or `.replace()`?

```txt
Error: Not implemented: navigation (except hash changes)
```

Or tried to mock `window.location` and gotten an error like this?

```txt
TypeError: Cannot redefine property: location
```

This Jest plugin fixes this error and mocks out `window.location` so it behaves similar to how does in the browser.

## Features

- 🆕 **New in v3.0.0:** Compatibility with JSDOM's `window.history` implementation and `react-router-dom` ([see limitations](#limitations))
- 🆕 **New in v3.0.0:** Compatibility with JSDOM v21+'s unconfigurable / unforgeable `window.location`
- 🎛️ Mocks and controls `window.location` in JSDOM Jest tests
- 🕵️‍♀️ Includes Jest spies all of the methods on `window.location` and `window.history`
- ⚓ Supports using relative URLs so pathnames that work in the browser also work in JSDOM
- 🔕 Prevents `console.error` messages from JSDOM when changing `window.location`
- 🤐 Does not affect Jest environments without `window`, or in other words, it doesn't cause errors on mixed JSDOM / Node.js projects
- 🔍 Provides a custom Jest matcher with TypeScript support for checking the current location

## Installation

```bash
npm install --save-dev jest-location-mock
```

## Usage

To start using Jest Location Mock, importing the default export will add the `expect()` matcher as well as a
`beforeAll()` and `beforeEach()` hook that will mock `window.location` and watch `window.history`.

### Quick Start

**`jest.config.js`**

```js
export default {
	// [other Jest config properties...]
	setupFilesAfterEnv: [
		"./config/jest-setup.js"
	]
};
```

**`config/jest-setup.js`**

```js
// Mock `window.location` with Jest spies and Jest expect matcher
import "jest-location-mock";
```

### Other Setup Methods

<details>
<summary><strong>With Create React App (Easy)</strong></summary>

Create React App (`react-scripts`) [automatically includes `setupFilesAfterEnv`](https://create-react-app.dev/docs/running-tests#initializing-test-environment) if it finds a setup tests file. Add the following to the file if it exists, or create a file. You do not need to modify a Jest config unless you've ejected from Create React App.

**`src/setupTests.js`** or **`src/setupTests.ts`**

```js
// Mock `window.location` with Jest spies and Jest expect matcher
import "jest-location-mock";
```

</details>

<details>
<summary><strong>Without a Setup File (Easy)</strong></summary>

If you don't want to group the location mock with any other test setup logic, you can just include the package name directly in the array.

**`jest.config.js`**

```js
export default {
	// [other Jest config properties...]
	setupFilesAfterEnv: [
		"jest-location-mock"
	]
};
```

</details>

<details>
<summary><strong>With TypeScript Jest Files</strong></summary>

Jest setup and config files can be in TypeScript, given that you are already using [`ts-jest`](https://kulshekhar.github.io/ts-jest/).

**`jest.config.ts`**

```ts
import type {Config} from "jest";

const config: Config = {
	// [other Jest config properties...]
	setupFilesAfterEnv: [
		"./config/jest-setup.ts"
	]
};

export default config;
```

**`config/jest-setup.ts`**

```ts
// Mock `window.location` with Jest spies and Jest expect matcher
import "jest-location-mock";
```

</details>

<details>
<summary><strong>Changing the Starting Location</strong></summary>

The starting location is `http://localhost/` by default. If `process.env.HOST` is set before the `beforeEach()` that creates the mock (e.g. a real environment variable or the value is set by JavaScript roughly right before each test is run), this value is used instead.

However, the most straightforward solution to changing the starting location is to be verbose about the desired location either in your setup file:

**`config/jest-setup.js`**

```js
// Mock `window.location` with Jest spies and Jest expect matcher
import "jest-location-mock";

beforeEach(() => {
	window.location = "https://example.com";
});
```

Or in your tests:

**`__tests__/starting-location-example.test.js`**

```js
beforeEach(() => {
	window.location = "https://example.com";
});
```

This is by no means required, especially if you do not need to test for behavior dependant on the starting location or the origin.

</details>

<details>
<summary><strong>Selectively Include the Mock in Certain Test Files</strong></summary>

If you do not include the default import in the test environment setup file, you can apply the mock only in certain test suites by importing it at the top of each file that needs the mock.

**`__tests__/needs-location-mock-example.test.js`**

```js
// Mock `window.location` with Jest spies and Jest expect matcher
import "jest-location-mock";

// Example test that will pass once the mock is imported
test("should not error when pressed", () => {
	jest.spyOn(console, "error");
	window.location.href = "https://example.com/";
	expect(console.error).not.toHaveBeenCalled();
	expect(window.location.href).toBe("https://example.com/");
});
```

</details>

<details>
<summary><strong>Customizing the Behavior (Advanced)</strong></summary>

If the default behavior of including the Jest `expect()` matchers and creating a `beforeEach()` Jest hook that mocks the `window.location` and listens to methods on `window.history` doesn't work best for you, you may replace the default import with a custom setup.

**`config/jest-setup.js`**

```js
// Remove: `import "jest-location-mock";`

// Do you like the fun little Jest matchers? If so, you may use this import:
import "jest-location-mock/lib/extend-expect";
// Or exclude this to omit them (remember to remove the default import)

// ---

// Did you want to exclude the matchers, but still want the default hook? If so you may use this import:
import "jest-location-mock/lib/setup-hooks";
// Otherwise, you may import the functions that run inside the hook and craft your own logic
import {replaceHistory, replaceLocation, reset} from "jest-location-mock/lib/hooks";

// `beforeAll()` is used by default to setup the mock on the window
beforeAll(() => {
	// This is where the most of magic happens, you probably want to keep this
	replaceLocation();
	// New in v3.0.0, proxy and spy on `window.history` to support use cases like browser router from react-router-dom
	// - Remove to isolate the `window.location` mock from `window.history`
	replaceHistory();
});
// `beforeEach()` is used by default for a clean slate for each test
beforeEach(() => {
	reset();
});
```

</details>

### Jest `expect` Matchers

#### `expect(location).toBeAt(url, [base])`

**Throws**: When the URLs have a different absolute `href`.

| Parameter | Type                | Description                                                             |
| --------- | ------------------- | ----------------------------------------------------------------------- |
| location  | `Location` \| `URL` | Instance of `URL` to check its `href`                                   |
| url       | `string` \| `URL`   | Relative or absolute `URL`                                              |
| base      | `string` \| `URL`   | If the `url` parameter is relative, an base URL for the URL constructor |

```ts
it("should call assign with a relative url", () => {
    window.location.assign("/relative-url");
    expect(window.location).not.toBeAt("/");
    expect(window.location).toBeAt("/relative-url");
});
```

## Limitations

- **Side effects of updating the location are not implemented** This project expects to be used in a context where side
  effects are either ignored or handled by the tested code or the router provided by the framework it runs on.
    - JSDOM has limitations with navigation, and if you need a more rigorous test environment for the code you're
      testing, consider a browser based test technology like Playwright, Cypress, or Puppeteer.
- **JSDOM has limitations with history traversal**: Navigation, including `window.history`, isn't fully implemented in
  JSDOM. This project aims to improve the behavior of the location API without breaking tests that rely on JSDOM's
  history API. However, the project currently does not replace their implementation, so any outstanding limitation of
  JSDOM's `window.history` still applies.
    - `window.history.back()`, `forward()`, and `go()` will not error, but they will not reflect any history traversal
      in `window.location` ([jsdom#1565](https://github.com/jsdom/jsdom/issues/1565))
- **Relies on `window._globalProxy` from JSDOM:** This property has been available for years, but should it disappear in
  a new JSDOM version, this project will stop working. Unfortunately between JSDOM making `window.location`
  unconfigurable and not being open to an API for mocking purposes (since it's made for spec compliance, not testing
  niches), there may not be a good workaround if it's removed. If you cannot update your tested code, this project aims
  to be more stable than a [package patch](https://gist.github.com/cpojer/e66f9a082021a82230f2595a6027f161)

## License

Copyright Evelyn Hathaway, [MIT License](/LICENSE)
