const axios = require('axios');

const URL = 'http://localhost';

export default class Client {
  constructor() {}
  gossip(port, state) {
    if (port === PORT) {
      return JSON.dump({});
    }

    axios
      .post(`${URL}:${port}/gossip`, { state })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }
}