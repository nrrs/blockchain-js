const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const URL = "http://localhost";
const PORT = 4567;
const BALANCES = {
    'norris': 100000
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    res.send('Stage 1 Working...');
});

app.get('/balance', (req, res, next) => {
    let user = req.query.user;

    if (user === undefined) {
        res.send(BALANCES);
        return;
    }

    if (user === '' || !BALANCES[user]) {
        res.send('Invalid User'); 
        return;
    }
    printState();
    res.send(`${user} has ${BALANCES[user]}`);
});

app.post('/users', (req, res, next) => {
    let name = req.body.name.toLowerCase();
    BALANCES[name] = BALANCES[name] || 0;
    printState();
    res.send(`${name} created OK`);
});

app.post('/transfer', (req, res, next) => {
    let from = req.body.from.toLowerCase(),
        to = req.body.to.toLowerCase(),
        amount = parseInt(req.body.amount);
    
    if (BALANCES[from] < amount) { 
        res.send('Insufficient Funds.'); 
        return;
    }

    BALANCES[from] -= amount;
    BALANCES[to] += amount;
    printState();
    res.send(`Transaction Complete: ${from} paid ${to} ${amount}`);
});

app.listen(PORT, () => console.log(`listenting on port ${PORT}`));

function printState() {
  console.log("Current Balance: ", BALANCES);
}