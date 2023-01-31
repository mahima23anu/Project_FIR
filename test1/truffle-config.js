const HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonic = require("./secret.json").secret;
console.log(mnemonic);

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard BSC port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    rinkeby: {
      provider: function() { 
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/981f2c0f5fbd4a3aa8bf879684d6e2df");
       },
       network_id: 4,
       gas: 4500000,
       gasPrice: 10000000000, 
    },
    testnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s3.binance.org:8545`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    bsc: {
      provider: () => new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    goerli: {
      provider: () => {
        return new HDWalletProvider(mnemonic, 'https://goerli.infura.io/v3/981f2c0f5fbd4a3aa8bf879684d6e2df')
      },
      network_id: '5', // eslint-disable-line camelcase
      gas: 30000000,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  //contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis',
  // Configure your compilers
  compilers: {
    solc: {
      version: "^0.8.14", // A version or constraint - Ex. "^0.5.0"
    }
  }
};