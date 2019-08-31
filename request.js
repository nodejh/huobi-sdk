const axios = require('axios');

const instance = axios.create({
  timeout: 1000 * 10,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  function(response) {
    if (response.data.status !== 'ok') {
      return Promise.reject(response.data);
    }
    return response.data;
  },
  function(error) {
    const { code, message, stack } = error;
    const e = new Error(`${code}: ${message}`);
    e.stack = stack;
    return Promise.reject(e);
  }
);

module.exports = instance;
