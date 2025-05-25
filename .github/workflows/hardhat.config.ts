import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as tenderly from "@tenderly/hardhat-tenderly";
import * as dotenv from "dotenv";

dotenv.config();

tenderly.setup({ automaticVerifications: true });

task("deploy", "Deploys Chonk9K contract and triggers Tenderly verification")
  .setAction(async (_, hre) => {
    console.log(`Deploying on network: ${hre.network.name}`);

    const Factory = await hre.ethers.getContractFactory("Chonk9K");
    const contract = await Factory.deploy();
    await contract.deployed();

    console.log(`Contract deployed at: ${contract.address}`);
  });

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  defaultNetwork: "tenderly",
  networks: {
    tenderly: {
      url: process.env.TENDERLY_URL,
      chainId: 8453,
      accounts: process.env.DEPLOYER_PRIVATE_KEY ? [process.env.DEPLOYER_PRIVATE_KEY] : [],
    },
  },
  tenderly: {
    username: process.env.TENDERLY_USERNAME || "BoomchainLabs",
    project: process.env.TENDERLY_PROJECT || "chonk9k",
  },
};

export default config;
