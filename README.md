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
    <a href="https://www.npmjs.com/package/@passninja/passninja-js">
        <img alt="npm package" src="https://img.shields.io/npm/v/@passninja/passninja-js.svg?style=flat-square" />
    </a>
</div>

# Contents

- [Contents](#contents)
- [Installation](#installation)
- [Usage](#usage)
  - [`PassNinjaClient`](#passninjaclient)
  - [`PassNinjaClient Methods`](#passninjaclientmethods)
  - [Script Tag](#script-tag)
  - [Examples](#examples)
- [TypeScript support](#typescript-support)
- [Documentation](#documentation)

# Installation

Use `npm` or `yarn` to install the passninja-js module:

```sh
npm install @passninja/passninja-js
```

# Usage

## `PassNinjaClient`

This function returns a newly created `PassNinjaClient` object. Make sure to
pass your user credentials to make any authenticated requests.

```js
const {PassNinjaClient} = require('@passninja/passninja-js');

const accountId = '**your-account-id**';
const apiKey = '**your-api-key**';

const passNinjaClient = new PassNinjaClient(accountId, apiKey);
```

We’ve placed our demo user API credentials in this example. Replace it with your
[actual API credentials](https://passninja.com/auth/profile) to test this code
through your PassNinja account and don't hesitate to contact
[PassNinja](https://passninja.com) with our built in chat system if you'd like
to subscribe and create your own custom pass type(s).

For more information on how to use `passninja-js` once it loads, please refer to
the [PassNinja JS API reference](https://passninja.com/docs/js)

## `PassNinjaClientMethods`

This library currently supports methods for creating, getting, updating, and
deleting passes via the PassNinja api. The methods are outlined below. Note that
each method returns a promise.

### Create

```js
const simplePassObject = await passNinjaClient.pass.create(
  'ptk_0x14', // passType
  {discount: '50%', memberName: 'John'} // passData
);
console.log(simplePassObject.url);
console.log(simplePassObject.passType);
console.log(simplePassObject.serialNumber);
```

### Find

Finds issued passes for a given pass template key

```js
const passObjects = await passNinjaClient.pass.find(
  'ptk_0x14' // passType or pass template key
);
```

### Decrypt

Decrypts issued passes payload for a given pass template key

```js
const decryptedPass = await passNinjaClient.pass.decrypt(
  'ptk_0x14',  // passType or pass template key
  '55166a9700250a8c51382dd16822b0c763136090b91099c16385f2961b7d9392d31b386cae133dca1b2faf10e93a1f8f26343ef56c4b35d5bf6cb8cd9ff45177e1ea070f0d4fe88887' // payload
);
```

### Get

```js
const detailedPassObject = await passNinjaClient.pass.get(
  'ptk_0x14', // passType
  '840a0562-f22d-4ecf-a2d7-9ac785bed8e4' // serialNumber
);
```

### Get Pass Template Details

```js
const passTemplate = await passNinjaClient.passTemplates.find(
  'ptk_0x14', // passTemplate key
);
console.log(passTemplate.pass_type_id);
```

### Update

```js
const simplePassObject = await passNinjaClient.pass.put(
  'ptk_0x14', // passType
  '840a0562-f22d-4ecf-a2d7-9ac785bed8e4', // serialNumber
  {discount: '100%', memberName: 'Ted'} // passData
);
```

### Delete

```js
const deletedPassSerialNumber = await passninja.pass.delete(
    'ptk_0x14', // passType,
    '840a0562-f22d-4ecf-a2d7-9ac785bed8e4' // serialNumber
);
console.log(`Pass deleted. serial_number: ${deletedPassSerialNumber})); })();
```

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
