require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const proyectId = process.env.INFURA_PROJECT_ID;
const privateKey = process.env.DEPLOYER_SIGNER_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    sepolia:{
      url: `https://sepolia.infura.io/v3/${proyectId}`,
      accounts: [privateKey],
    },
  },
};
