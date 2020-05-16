
const Hb = require('../index');
const SocksProxyAgent = require('socks-proxy-agent');

const agent = new SocksProxyAgent('socks://127.0.0.1:1081');

(async () => {
  try {
    const hb = new Hb({
      accessKey: process.env.HAK || '',
      secretKey: process.env.HSK || '',
      agent,
    });
    // const symbols = await hb.getCommonSymbols();
    // console.log('symbols: \n', JSON.stringify(symbols));
    // const account = await hb.getAccountAccounts();
    // console.log('account: \n', account);

    // account [
      // { id: 123, type: 'spot', subtype: '', state: 'working' },
      // { id: 123, type: 'point', subtype: '', state: 'working' }
    // ]

    // const market = await hb.getMarketDetailMerged({ symbol: 'btcusdt' });
    // {
    //   status: 'ok',
    //   ch: 'market.btcusdt.detail.merged',
    //   ts: 1567442388249,
    //   tick: {
    //     amount: 21277.81704632057,
    //     open: 9569.05,
    //     close: 9897.3,
    //     high: 9950,
    //     id: 204560860374,
    //     count: 232940,
    //     low: 9520,
    //     version: 204560860374,
    //     ask: [ 9897.3, 0.8108300748668829 ],
    //     vol: 207963140.92973444,
    //     bid: [ 9897.24, 1.09359 ]
    //   }
    // }
    // console.log('market', market);

    // const order = await hb.postOrderOrdersPlace({
    //   'account-id': '123',
    //   symbol: 'btcusdt',
    //   type: 'buy-market',
    //   amount: 0.1,
    // })
    // console.log('order', order);

    const order = await hb.invoke('GET', '/v1/order/orders/123');
    console.log('order', order);
    console.log('order', order);
  } catch (error) {
    console.log('error: \n', error);
  }
})()