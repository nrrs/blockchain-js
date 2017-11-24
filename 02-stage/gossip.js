const express = require("express");
const bodyParser = require("body-parser");
// import Client from './client';
// const helpers = require('./helpers');

const app = express();

const PORT = process.argv[2],
    PEER_PORT = process.argv[3];

// Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res, next) => {
    res.send("Stage 2 Working...");
});
app.post("/gossip", (req, res, next) => {
    let state = req.body.state;
    updateState(state);
    res.send(JSON.stringify(STATE));
});

app.listen(PORT, () => console.log(`listenting on port ${PORT}`));

const STATE = {};

updateState({[PORT]: null});
updateState({[PEER_PORT]: null});
// helpers.updateState({[PORT]: null});
// helpers.updateState({[PEER_PORT]: null});

const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};

let faveLetter = ALPHA.random();
let versionNum = 0;

console.log(`My favorite letter is ${faveLetter}\n`);


updateState({
    [PORT]: [faveLetter, versionNum]
});
// helpers.updateState({
//     [PORT]: [faveLetter, versionNum]
// });

// Randomly select new 


const axios = require("axios");

const URL = "http://localhost";

class Client {
  constructor() {}
  gossip(port, state) {
    if (port === PORT) {
      return JSON.stringify({});
    }

    axios
      .post(`${URL}:${port}/gossip`, { state })
      .then(res => {
          console.log('Client post SUCCESS');
          return res.data;
        })
      .catch(err => console.log('Client post FAIL'));
  }
}
// Change state every 8 seconds
setInterval(() => {
    faveLetter = ALPHA.random();
    versionNum++;
    updateState({[PORT]: [faveLetter, versionNum]});
    console.log('\n');
    console.log("!".repeat(40));
    console.log(`Nevermind, my new favorte letter is ${faveLetter}`);
    console.log("!".repeat(40), '\n');
}, 8000);

// Fetch updates every 3 secs
setInterval(() => {
    Object.keys(STATE)
        .forEach(port => {
            if (port === PORT) {
                return;
            }
            console.log(`Fetching update from ${port}`);
            
            let gossipResponse = new Client();
            gossipResponse = gossipResponse.gossip(port, STATE);
            // gossipResponse = gossipResponse.gossip(port, JSON.stringify(STATE));
            updateState(gossipResponse);
        });
    
        renderState();
}, 3000);

// Helpers
function updateState(update) {
    for (let port in update) {
        if (update.hasOwnProperty(port)) {
            if (update[port] === null) {
                STATE[port] = null;
            } else {
                STATE[port] = update[port];
            }
        }
    }
    return STATE;
}

function renderState() {
    console.log('-'.repeat(40));
    Object.keys(STATE).forEach(port => {
        if (STATE[port] === null) {
            console.log(`${port} doesn't have a fave letter yet`);
        } else {
            console.log(`${port} fave letter is ${STATE[port][0]}`);
        }
    });
    console.log('-'.repeat(40));
}