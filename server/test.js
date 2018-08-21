const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();


let bc1 = {
    "chain": [
        {
            "index": 0,
            "timestamp": 1534438774572,
            "transactions": [],
            "documents": [],
            "nonce": 0,
            "previousHash": "0",
            "hash": "1c1de23ed477aa7ca75b7b6c3810e7c15bace01fa34a02588f4276acbd6770ed"
        },
        {
            "index": 1,
            "timestamp": 1534440916004,
            "transactions": [
                {
                    "amount": 70,
                    "sender": "sender",
                    "recipient": "recipient",
                    "transactionId": "b88d4c30a17a11e8b13f4382a0325096"
                },
                {
                    "amount": 70,
                    "sender": "sender",
                    "recipient": "recipient",
                    "transactionId": "b92c2440a17a11e8b13f4382a0325096"
                },
                {
                    "amount": 70,
                    "sender": "sender",
                    "recipient": "recipient",
                    "transactionId": "ba008b40a17a11e8b13f4382a0325096"
                }
            ],
            "documents": [],
            "nonce": 33703,
            "previousHash": "1c1de23ed477aa7ca75b7b6c3810e7c15bace01fa34a02588f4276acbd6770ed",
            "hash": "0000b96a64555df52dc5d8343ed83ec366da3ff6499990bdba56bd9d820ad9f5"
        },
        {
            "index": 2,
            "timestamp": 1534440918255,
            "transactions": [
                {
                    "amount": 100,
                    "sender": "00",
                    "recipient": "c06266c0a17511e8b13f4382a0325096",
                    "transactionId": "bd4f1a00a17a11e8b13f4382a0325096"
                }
            ],
            "documents": [],
            "nonce": 29591,
            "previousHash": "0000b96a64555df52dc5d8343ed83ec366da3ff6499990bdba56bd9d820ad9f5",
            "hash": "0000bc1944edbb35f0488f2c6f9c651e430b25baf1190d310f86e52709cb2915"
        },
        {
            "index": 3,
            "timestamp": 1534440919356,
            "transactions": [
                {
                    "amount": 100,
                    "sender": "00",
                    "recipient": "c06266c0a17511e8b13f4382a0325096",
                    "transactionId": "be444f70a17a11e8b13f4382a0325096"
                }
            ],
            "documents": [],
            "nonce": 150116,
            "previousHash": "0000bc1944edbb35f0488f2c6f9c651e430b25baf1190d310f86e52709cb2915",
            "hash": "0000f4bd276f80db52c21febe9acb9ee95b883185dac9f66751d43dfc3778b49"
        },
        {
            "index": 4,
            "timestamp": 1534440921225,
            "transactions": [
                {
                    "amount": 100,
                    "sender": "00",
                    "recipient": "c06266c0a17511e8b13f4382a0325096",
                    "transactionId": "bf7ca860a17a11e8b13f4382a0325096"
                }
            ],
            "documents": [],
            "nonce": 22778,
            "previousHash": "0000f4bd276f80db52c21febe9acb9ee95b883185dac9f66751d43dfc3778b49",
            "hash": "0000384c398e56cbb134e7c1c68f1b6b4f476517bbf9381cca8529ad6778ac70"
        },
        {
            "index": 5,
            "timestamp": 1534440947579,
            "transactions": [
                {
                    "amount": 100,
                    "sender": "00",
                    "recipient": "c06266c0a17511e8b13f4382a0325096",
                    "transactionId": "bffef7c0a17a11e8b13f4382a0325096"
                }
            ],
            "documents": [
                {
                    "owner": "owner",
                    "title": "title",
                    "document": "awlgibalwbgilawibglaiwbg"
                },
                {
                    "owner": "owner",
                    "title": "title",
                    "document": "awlgibalwbgilawibglaiwbg"
                }
            ],
            "nonce": 47897,
            "previousHash": "0000384c398e56cbb134e7c1c68f1b6b4f476517bbf9381cca8529ad6778ac70",
            "hash": "000050d6d7bc977e110cf18015638d297ee180558c01ffaa75def64adccd025c"
        }
    ],
    "difficulty": 4,
    "miningReward": 100,
    "pendingTransactions": [
        {
            "amount": 100,
            "sender": "00",
            "recipient": "c06266c0a17511e8b13f4382a0325096",
            "transactionId": "cfdf2570a17a11e8b13f4382a0325096"
        }
    ],
    "pendingDocuments": [],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
}

console.log(bitcoin.isChainValid(bc1));
