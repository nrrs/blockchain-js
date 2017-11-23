const express = require("express");
const bodyParser = require("body-parser");
const helpers = require('./helpers');

const app = express();

const   PORT = process.argv[2],
        PEER_PORT = process.argv[3];

const STATE = {};

helpers.updateState({ [PORT]: null });
helpers.updateState({ [PEER_PORT]: null });

const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
};

var faveLetter = ALPHA.random();
var versionNum = 0;

console.log(`My favorite letter is ${faveLetter}`);

helpers.updateState({ [PORT]: [faveLetter, versionNum]});

setInterval(() => {
    STATE.keys.forEach(port => {
        if (port === PORT) { return; }
        console.log(`Fetching update from ${port}`);
        
    });
}, 3000);


// Express

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.send("Stage 2 Working...");
});

app.listen(PORT, () => console.log(`listenting on port ${PORT}`));