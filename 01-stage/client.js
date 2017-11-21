const axios = require('axios');
const querystring = require('querystring');

const URL = 'http://localhost';
const PORT = 4567;

function createUser(name) {
    axios
      .post(`${URL}:${PORT}/users`, { name })
      .then(res => console.log(res.data));
}

function getBalance(user) {
    axios
      .get(`${URL}:${PORT}/balance`, { params: { user } })
      .then(res => console.log(res.data))
      .catch(err => console.log('Invalid User'));
}

function transfer(from, to, amount) {
    axios
        .post(`${URL}:${PORT}/transfer`, { from, to, amount })
        .then(res => console.log(res.data));
}