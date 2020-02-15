# Huobi SDK

https://huobiapi.github.io/docs/spot/v1/cn/#urls

## Usage

```sh
$ npm i hb-sdk --save
```

```js
const Hb = require('hb-sdk');
const hb = new Hb({
  accessKey: '',
  secretKey: '',
  url: 'api.huobi.pro',
});

const symbols = await hb.getCommonSymbols();
const account = await hb.getAccountAccounts();

// invoke
const order = await hb.invoke('GET', '/v1/order/orders/123', {});
```
