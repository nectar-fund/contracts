const config = require("./config");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.3",
  networks: {
    hardhat: {
      chainId: 1
    },
    hardhat_local: {
      url: "http://localhost:8545",
      forking: {
        url: 'https://bsc-dataseed.binance.org/'
      },
      chainId: 1,
      gasPrice: 20000000000,
      allowUnlimitedContractSize: true
    },
    testnet: {
      url: `https://data-seed-prebsc-2-s3.binance.org:8545/`,
      chainId: 97,
      accounts: {
        mnemonic: process.env.SEED
      }
    },
    mainnet: {
      url: `https://bsc-dataseed.binance.org/`,
      chainId: 56,
      gasPrice: 20000000000,
      accounts: {
        mnemonic: process.env.SEED
      }
    }
  },
  etherscan: {
    apiKey: config.EXPLORER_KEY
  },
  mocha: {
    timeout: 180000
  }
};
