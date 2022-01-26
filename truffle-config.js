require("ts-node").register({
  files: true,
});

require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = require('./secrets.json').mnemonic

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    }, 
    bscTest: {
      provider: () => new HDWalletProvider(mnemonic, `https://speedy-nodes-nyc.moralis.io/47328298ca64dbb1613cfcd6/bsc/testnet`),
      network_id: 97,
      gas: 5500000,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    }   
  },

  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: ">=0.6.0 <0.8.0",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
