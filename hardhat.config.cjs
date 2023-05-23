require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
const fs = require('fs');
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";
require('dotenv').config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 5
    },
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/6mNC_JOPUGNaxNi5zHthGhInd9QftqdC',
      accounts: ['c22fd1652caecada36f0abc1d38dda42e1bac0ac8bc7510b9e8a7ea7d77044ec' ]
    }
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
