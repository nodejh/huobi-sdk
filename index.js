const hmacSHA256 = require('crypto-js/hmac-sha256');
const base64 = require('crypto-js/enc-base64');
const moment = require('moment');
const debug = require('debug')('hb-sdk')
const request = require('./request');
const logger = require('./logger');

const URL_DEFAULT = 'api.huobi.vn';


// const URL_HUOBI_PRO = 'api.huobipro.com';
// const URL_HUOBI_PRO = 'api.huobi.br.com'; // 不翻墙的地址
// const URL_HUOBI_PRO = 'api.huobi.pro'; //备用地址

class Hb {
  constructor(options) {
    const { accessKey, secretKey, url } = options;
    this.ak = accessKey;
    this.sk = secretKey;
    this.url = url || URL_DEFAULT;
  }

  sign({
    method,
    url,
    path,
    params,
  }) {    
    const paramsArr = [];

    const defaultSignParams = {
      AccessKeyId: this.ak,
      SignatureMethod: 'HmacSHA256',
      SignatureVersion: 2,
      Timestamp: moment.utc().format('YYYY-MM-DDTHH:mm:ss'),
    }
    for (let key in defaultSignParams) {
      paramsArr.push(`${key}=${encodeURIComponent(defaultSignParams[key])}`);
    }
    for (let key in params) {
      paramsArr.push(`${key}=${encodeURIComponent(params[key])}`);
    }
    const paramsStr = paramsArr.sort().join('&');

    const meta = [method, url, path, paramsStr].join('\n');
    const hash = hmacSHA256(meta, this.sk);
    const signature = encodeURIComponent(base64.stringify(hash));
    const api = `https://${url}${path}?${paramsStr}&Signature=${signature}`;
    debug('api: %s', api);
    return api;
  }

  async invoke(method, path, data) {
    const options = {
      method: method.toUpperCase(),
      url: this.url,
      path,
    };
    if (options.method === 'GET') {
      if (data) {
        options.params = data;
      }
      const api = this.sign(options);
      return await request.get(api);
    } else if (options.method === 'POST') {
      const api = this.sign(options);
      return await request.post(api, data);
    }
    return null;
  }

  async getCommonSymbols() {
    // GET /v1/common/symbols
    const options = {
      method: 'GET',
      url: this.url,
      path: '/v1/common/symbols',
    };
    try {
      const api = this.sign(options);
      return await request.get(api);
    } catch (error) {
      logger.error(options.method, options.path, error.message);
      throw error;
    }
  }

  async getAccountAccounts() {
    // GET /v1/common/symbols
    const options = {
      method: 'GET',
      url: this.url,
      path: '/v1/account/accounts',
    };
    try {
      const api = this.sign(options);
      return await request.get(api);
    } catch (error) {
      logger.error(options.method, options.path, error.message);
      throw error;
    }
  }

  async getMarketDetailMerged(params) {
    // GET /market/detail/merged
    const options = {
      method: 'GET',
      url: this.url,
      path: '/market/detail/merged',
      params,
    };
    try {
      const api = this.sign(options);
      return await request.get(api);
    } catch (error) {
      logger.error(options.method, options.path, error.message);
      throw error;
    }
  }

  async postOrderOrdersPlace(data) {
    // POST /v1/order/orders/place
    const options = {
      method: 'POST',
      url: this.url,
      path: '/v1/order/orders/place',
    };
    const api = this.sign(options);
    return await request.post(api, data);
  }

}


module.exports = Hb;
