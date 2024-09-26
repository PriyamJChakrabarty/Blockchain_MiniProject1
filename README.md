# WordUploader Smart Contract Project

This project showcases a simple Solidity smart contract for uploading and retrieving words, deployed using a Vite app on the Fantom test network.

## Overview

The `WordUploader` contract allows users to:
- Upload a word to the blockchain.
- Retrieve the list of all uploaded words.

The project is built with:
- **Solidity** for the smart contract.
- **Vite** for the frontend interface.
- **Fantom test network** as the blockchain.


## Compiling and Deploying the Smart Contract
To compile and deploy the smart contract, use the following commands:

```bash
npx hardhat compile
npx hardhat ignition deploy ignition/modules/WordUploader.js

```


## Running the Vite App
To compile and deploy the smart contract, use the following commands:

```bash
cd client
npm run dev
```
