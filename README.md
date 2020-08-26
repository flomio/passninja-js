# PassNinja-js ES Module

Use [PassNinja-js](https://passninja.com/docs) as an ES module.

[![npm version](https://img.shields.io/npm/v/@flomio/passninja-js.svg?style=flat-square)](https://www.npmjs.com/package/@flomio/passninja-js)

## Installation

Use `npm` to install the passninja-js module:

```sh
npm install @flomio/passninja-js
```

## Usage

### `PassNinjaClient`

This function returns a newly created `PassNinjaClient` object. Make sure to
pass your user credentials to make any authenticated requests.

```js
const {PassNinjaClient} = require('@flomio/passninja.js');

const accountId = '3a6bc54c-78be-4d63-b804-3164597cae4c';
const apiKey = 'lw9BrOkj4O9owCzuwZXzC3kGdAXg8SN01yYmxIGf';

const pnClient = new PassNinjaClient(accountId, apiKey);
```

We’ve placed our demo user API credentials in this example. Replace it with your
[actual API credentials](https://passninja.com/auth/profile) to test this code
through your PassNinja account and don't hesitate to contact
[PassNinja](https://passninja.com) with our built in chat system if you'd like
to subscribe and create your own custom pass type(s).

For more information on how to use `passninja-js` once it loads, please refer to
the [PassNinja JS API reference](https://passninja.com/docs/js)

## TypeScript support

This package includes TypeScript declarations for passninja-js. We support
projects using TypeScript versions >= 3.1.

### Manually include the script tag

Manually add the passninja-js script tag to the `<head>` of each page on your
site in order to use `PassNinjaClient`.

```html
<!-- Somewhere in your site's <head> -->
<script src="https://js.passninja.com/v1" async></script>
```

## passninja-js Documentation

- [PassNinja Docs](https://passninja.com/docs)
- [passninja-js Reference](https://passninja.com/docs/js)
