const axios = require('axios');


function getRequestInstance(agent) {
  const options = {
    timeout: 1000 * 10,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (agent) {
    options.httpAgent = agent;
    options.httpsAgent = agent;
  }

  const instance = axios.create(options);

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

  return instance;
}

module.exports = {
  getRequestInstance,
};
