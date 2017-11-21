const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.data = data;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "11/20/2017", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
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
norrisCoin.addBlock(new Block(1, "11/20/2017", { amount: 5 }));
norrisCoin.addBlock(new Block(2, "11/21/2017", { amount: 10 }));

console.log('Is blockchain valid?', norrisCoin.isChainValid());
// attempt to chain coin 2
norrisCoin.chain[1].data = { amount: 500 };
norrisCoin.chain[1].hash = norrisCoin.chain[1].calculateHash();

console.log('Is blockchain valid?', norrisCoin.isChainValid());

// console.log(JSON.stringify(norrisCoin, null, 4));