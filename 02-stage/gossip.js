const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

const URL = "http://localhost";
const PORT = process.argv[2];
const PEER_PORT = process.argv[3];
// const PEER_PORT = (process.argv[3] === undefined)
//     ? 'xxxx'
//     : process.argv[3];

const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const STATE = {};

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};

class Client {
    constructor() {}
    gossip(port, state) {
        if (port === PORT) {
            return JSON.stringify({});
        } else {
            axios
                .post(`${URL}:${port}/gossip`, {state})
                .then(res => res.data)
                .catch(err => console.log("Client POST FAIL: no peer port"));
        }

    }
}

updateState({[PORT]: null});
updateState({[PEER_PORT]: null});

let faveLetter = ALPHA.random();
let versionNum = 0;

console.log(`My favorite letter is ${faveLetter}\n`);

updateState({
    [PORT]: [faveLetter, versionNum]
});

// Change fave letter every 8 seconds
setInterval(() => {
    faveLetter = ALPHA.random();
    versionNum++;
    updateState({
        [PORT]: [faveLetter, versionNum]
    });
    console.log("!".repeat(40));
    console.log(`Nevermind, my new favorte letter is ${faveLetter}`);
    console.log("!".repeat(40), '\n\n');
}, 8000);

// Fetch updates every 3 secs
setInterval(() => {
    Object
        .keys(STATE)
        .forEach(port => {
            if (port === PORT || port === 'xxxx') {
                return;
            } else {
                console.log(`Fetching update from ${port}`);
                let gossipResponse = new Client();
                gossipResponse = gossipResponse.gossip(port, STATE);
                if (!gossipResponse) {
                    updateState(gossipResponse);
                }
            }
        });
    renderState();
    console.log('\n');
}, 2000);

// Helpers
function updateState(update) {
    for (let port in update) {
        if (update.hasOwnProperty(port)) {
            if (port === 'undefined') {
                return;
            } else {
                STATE[port] = update[port];
            }
        }
    }
    return STATE;
}

function renderState() {
    console.log('-'.repeat(40));
    Object
        .keys(STATE)
        .forEach(port => {
            if (STATE[port] === null) {
                return;
            } else {
                console.log(`${port} fave letter is ${STATE[port][0]}`);
            }
        });
    console.log('-'.repeat(40));
}

// Express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/gossip", (req, res, next) => {
    let state = req.body.state;
    updateState(state);
    res.send(JSON.stringify(STATE));
});

app.listen(PORT, () => console.log(`listenting on port ${PORT}`));