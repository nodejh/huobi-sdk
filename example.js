const Hb = require('./index');

(async () => {
  try {
    const hb = new Hb({
      ak: process.env.HAK || '',
      sk: process.env.HSK || '',
    });
    const symbols = await hb.getCommonSymbols();
    console.log('symbols: \n', JSON.stringify(symbols));
    // const account = await hb.getAccountAccounts();
    // console.log('account: \n', account);
  } catch (error) {
    console.log('error: \n', error);
  }
})()