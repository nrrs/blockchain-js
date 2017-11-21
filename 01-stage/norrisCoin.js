const express = require('express');
const app = express();
const URL = "http://localhost";
const PORT = 4567;
const BALANCES = {
    'norris': 100000
};

function printState() {
    // console.log('BALANCES: ', BALANCES);
    return BALANCES;
}

app.get('/', (req, res, next) => {
    res.send('Working...');
});

app.get('/balance', (req, res, next) => {
    // res.send('printState()');
    res.send(printState());
});

app.listen(PORT, () => console.log(`listenting on port ${PORT}`));