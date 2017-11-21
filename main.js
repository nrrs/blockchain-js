const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.data = data;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log('Block mined: ', this.hash);
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock() {
        return new Block(0, "11/20/2017", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        // newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let norrisCoin = new Blockchain();

console.log('Mining block 1...');
norrisCoin.addBlock(new Block(1, "11/20/2017", { amount: 5 }));

console.log('Mining block 2...');
norrisCoin.addBlock(new Block(2, "11/21/2017", { amount: 10 }));

// console.log('Is blockchain valid?', norrisCoin.isChainValid());
// // attempt to chain coin 2
// norrisCoin.chain[1].data = { amount: 500 };
// norrisCoin.chain[1].hash = norrisCoin.chain[1].calculateHash();

// console.log('Is blockchain valid?', norrisCoin.isChainValid());

// console.log(JSON.stringify(norrisCoin, null, 4));