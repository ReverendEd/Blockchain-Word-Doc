const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];
const uuid = require('uuid/v1');

class Transaction {
    constructor(amount, sender, recipient) {
        this.amount = amount;
        this.sender = sender;
        this.recipient = recipient;
        this.transactionId = uuid().split('-').join('');
    }
}

class Document {
    constructor(owner, title, document) {
        this.owner = owner;
        this.title = title;
        this.document = document;
    }

    //encrypt document method

    //decrypt document method
}

class Block {
    constructor(index, pendingTransactions, pendingDocuments, previousHash) {
        this.index = index,
            this.timestamp = Date.now(),
            this.transactions = pendingTransactions,
            this.documents = pendingDocuments,
            this.nonce = 0,
            this.previousHash = previousHash,
            this.hash = this.calculateHash()
    }

    calculateHash() {
        return (sha256(JSON.stringify(this.transactions) + JSON.stringify(this.documents) + this.nonce.toString() + this.previousHash))
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++
            this.hash = this.calculateHash();
        }
        console.log('block mined: ' + JSON.stringify(this));
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
        this.miningReward = 100;
        this.pendingTransactions = [];
        this.pendingDocuments = [];
        this.currentNodeUrl = currentNodeUrl;
        this.networkNodes = [];
    }

    createGenesisBlock() {
        return new Block(0, [], [], '0')
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    createTransaction(amount, sender, recipient) {
        return new Transaction(amount, sender, recipient)
    }

    addTransactionToPendingTransactions(transaction) {
        this.pendingTransactions.push(transaction)
    }

    createDocument(owner, title, document) {
        return new Document(owner, title, document)
    }

    addDocumentToPendingDocuments(document) {
        this.pendingDocuments.push(document)
    }

    createAndMineNewBlock(/*miningRewardAddress*/) {
        let block = new Block(this.chain.length, this.pendingTransactions, this.pendingDocuments, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log('block successfully mined');
        this.chain.push(block)

        this.pendingTransactions = [
            //new Transaction(this.miningReward, null, miningRewardAddress)
        ];

        this.pendingDocuments = [];

        return block;
    }

    isChainValid(wholechain) {
        const blockchain = wholechain.chain;
        let validChain = true;
        for (let i = 1; i < blockchain.length; i++) {
            const currentBlock = blockchain[i];
            const previousBlock = blockchain[i - 1];

            const blockHash = sha256(JSON.stringify(currentBlock.transactions) + JSON.stringify(currentBlock.documents) + currentBlock.nonce.toString() + currentBlock.previousHash);
            if (blockHash.substring(0, wholechain.difficulty) !== Array(wholechain.difficulty + 1).join("0")) {
                validChain = false;
                console.log(blockHash.substring(0, blockchain.difficulty));
                console.log(Array(wholechain.difficulty + 1).join("0"));
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                validChain = false;
                console.log(currentBlock.previousHash);
                console.log(previousBlock.hash);
            }

        }
        const genesisBlock = blockchain[0];
        const correctNonce = genesisBlock.nonce === 0;
        const correctPreviousHash = genesisBlock.previousHash === '0';
        const correctHash = genesisBlock.hash === '1c1de23ed477aa7ca75b7b6c3810e7c15bace01fa34a02588f4276acbd6770ed'//might be errors caused here
        const correctTransactions = genesisBlock.transactions.length === 0;
        const correctDocuments = genesisBlock.documents.length === 0;

        if (!correctNonce || !correctPreviousHash || !correctHash || !correctTransactions || !correctDocuments) {
            validChain = false;
            console.log('3rd barrier not crossed');
        }
        return validChain;
    }

    // getBalanceOfAddress(address) {

    //     let balance = 0;

    //     for (const block of this.chain) {
    //         for (const transaction of block.transactions) {
    //             if (transaction.sender === address) {
    //                 balance -= transaction.amount
    //             }
    //             if (transaction.recipient === address) {
    //                 balance += transaction.amount
    //             }
    //         }
    //     }
    //     return balance;
    //     console.log(balance);
    // }

    // getDocuments() {
    //     let documents = [];
    //     for (const block of this.chain) {
    //         for (const document of block.documents) {
    //             documents.push(document)
    //         }
    //     }
    //     return documents;
    // }

    getBlock(blockHash){
        let correctBlock = null;
        this.chain.forEach(block=>{
            if (block.hash === blockHash) {
                correctBlock = block;
                return correctBlock
            };
        });
        return correctBlock;
    };

    getTransaction(transactionId){
        let correctTransaction = null;
        let correctBlock = null;
        this.chain.forEach(block=>{
            block.transactions.forEach(transaction=>{
                if (transaction.transactionId === transactionId) {
                    correctTransaction = transaction;
                    correctBlock = block
                    return {
                        transaction: correctTransaction,
                        block: correctBlock
                    };
                };
            });
        });
        return {
            transaction: correctTransaction,
            block: correctBlock
        };
    };

    getDocuments(ownerId){
        let documentList = [];
        let blockList = [];
        this.chain.forEach(block=>{
            block.documents.forEach(document=>{
                if (document.owner === ownerId) {
                    documentList.push(document)
                    blockList.push(block)
                    return {
                        note: 'documents retrieved',
                        documentList: documentList,
                        blockList: blockList
                    };
                };
            });
        });
        return {
            note: 'documents retrieved',
            documentList: documentList,
            blockList: blockList
        };
    };

    getAddressData(address){
        const addressTransactions = [];
        this.chain.forEach(block=>{
            block.transactions.forEach(transaction=>{
                if (transaction.sender === address || transaction.recipient === address) {
                    addressTransactions.push(transaction);
                };
            });
        });
        let balance = 0;
        addressTransactions.forEach(transaction=>{
            if (transaction.recipient === address) {
                balance += transaction.amount;
            }
            else if (transaction.sender === address) {
                balance -= transaction.amount;
            };
        });
        return {
            addressTransactions: addressTransactions,
            addressBalance: balance
        };
    };
    
};

module.exports = Blockchain;

