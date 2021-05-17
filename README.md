<div align="center">

<img alt="Jest Location Mock icon" width="128" height="128" align="center" src=".github/icon.png"/>

# Jest Location Mock

**Jest hooks for JSDOM location mock**

[![npm version](https://badgen.net/npm/v/jest-location-mock?icon=npm)](https://www.npmjs.com/package/jest-location-mock)
[![check status](https://badgen.net/github/checks/evelynhathaway/jest-location-mock/main?icon=github)](https://github.com/evelynhathaway/jest-location-mock/actions)
[![license: MIT](https://badgen.net/badge/license/MIT/blue)](/LICENSE)

</div>

## Description

Ever gotten the following error when using `window.location.assign`, `reload`, or `replace`?

```txt
Error: Not implemented: navigation (except hash changes)
```

This Jest plugin fixes this error and mocks out `window.location` so it behaves similar to how does in the browser.

## Features

- Mock and control window.location
- Relative URL support
- TypeScript extend expect support

## Installation

```bash
npm install --save-dev jest-location-mock
```

## Usage

To start using Jest Location Mock, extend expect and add hooks by importing the default export in your jest setup file.

### Setup

**`jest.config.js`**

```js
module.exports = {
    setupFilesAfterEnv: [
        "./config/jest-setup.js"
    ]
};
```

**`config/jest-setup.js`**

```js
// Mock `window.location` with Jest spies and extend expect
import "jest-location-mock";
```

### Matchers

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

## License

Copyright Evelyn Hathaway, [MIT License](/LICENSE)
