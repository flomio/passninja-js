<p align="center">
    <img width="400px" src=https://user-images.githubusercontent.com/1587270/74537466-25c19e00-4f08-11ea-8cc9-111b6bbf86cc.png>
</p>
<h1 align="center">passninja-js</h1>
<h3 align="center">
Use <a href="https://passninja.com/docs">passninja-js</a> as an ES module.</h3>

<div align="center">
    <a href="https://github.com/flomio/passninja-js">
        <img alt="Status" src="https://img.shields.io/badge/status-active-success.svg" />
    </a>
    <a href="https://github.com/flomio/passninja-js/issues">
        <img alt="Issues" src="https://img.shields.io/github/issues/flomio/passninja-js.svg" />
    </a>
    <a href="https://www.npmjs.com/package/@flomio/passninja-js">
        <img alt="npm package" src="https://img.shields.io/npm/v/@flomio/passninja-js.svg?style=flat-square" />
    </a>
</div>

# Contents

- [Contents](#contents)
- [Installation](#installation)
- [Usage](#usage)
  - [`PassNinjaClient`](#passninjaclient)
  - [Script Tag](#script-tag)
  - [Examples](#examples)
- [TypeScript support](#typescript-support)
- [Documentation](#documentation)

# Installation

Use `npm` or `yarn` to install the passninja-js module:

```sh
npm install @flomio/passninja-js
```

# Usage

## `PassNinjaClient`

This function returns a newly created `PassNinjaClient` object. Make sure to
pass your user credentials to make any authenticated requests.

```js
const {PassNinjaClient} = require('@flomio/passninja-js');

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

## Script Tag

Manually add the passninja-js script tag to the `<head>` of each page on your
site in order to use `PassNinjaClient`.

```html
<!-- Somewhere in your site's <head> -->
<script src="https://js.passninja.com/v1" async></script>
```

## Examples

Feel free to browse the [Examples Folder](./examples) for implementations

# TypeScript support

This package includes TypeScript declarations for passninja-js. We support
projects using TypeScript versions >= 3.1.

# Documentation

- [PassNinja Docs](https://passninja.com/docs)
- [passninja-js Reference](https://passninja.com/docs/js)
