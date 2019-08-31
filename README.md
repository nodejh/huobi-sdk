# Huobi SDK

## Usage

```sh
$ npm i hb-sdk
```

```js
const Hb = require('hb-sdk');
const hb = new Hb({
  ak: '',
  sk: '',
});

const symbols = await hb.getCommonSymbols();
const account = await hb.getAccountAccounts();
```
