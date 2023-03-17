require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const proyectId = process.env.INFURA_PROJECT_ID;
const proyectId2 = process.env.INFURA_PROJECT_ID2;
const privateKey = process.env.DEPLOYER_SIGNER_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    sepolia:{
      url: `https://sepolia.infura.io/v3/${proyectId}`,
      accounts: [privateKey],
    },
    goerli:{
      url: `https://eth-goerli.g.alchemy.com/v2/${ proyectId2 }`,
      accounts: [privateKey],
    }
  },
};
