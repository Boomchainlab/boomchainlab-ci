#!/bin/bash

# Set base directory
BASE_DIR="evm-web3-starter"
mkdir -p $BASE_DIR

# contracts/MyToken.sol
mkdir -p $BASE_DIR/contracts
cat > $BASE_DIR/contracts/MyToken.sol <<'EOF'
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        _mint(msg.sender, initialSupply);
    }
}
EOF

# hardhat.config.js
cat > $BASE_DIR/hardhat.config.js <<'EOF'
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {},
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
EOF

# scripts/deploy.js
mkdir -p $BASE_DIR/scripts
cat > $BASE_DIR/scripts/deploy.js <<'EOF'
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const MyToken = await ethers.getContractFactory("MyToken");
  const token = await MyToken.deploy(1000000);

  console.log("Token deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
EOF

# test/token-test.js
mkdir -p $BASE_DIR/test
cat > $BASE_DIR/test/token-test.js <<'EOF'
const { expect } = require("chai");

describe("MyToken", function () {
  it("Should deploy and assign initial supply to owner", async function () {
    const [owner] = await ethers.getSigners();
    const MyToken = await ethers.getContractFactory("MyToken");
    const token = await MyToken.deploy(1000);
    const balance = await token.balanceOf(owner.address);
    expect(balance).to.equal(1000);
  });
});
EOF

# package.json
cat > $BASE_DIR/package.json <<'EOF'
{
  "name": "evm-web3-starter",
  "version": "1.0.0",
  "scripts": {
    "test": "npx hardhat test",
    "dev": "cd frontend && pnpm dev"
  },
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox": "^3.0.0",
    "hardhat": "^2.22.0"
  }
}
EOF

# Frontend setup
mkdir -p $BASE_DIR/frontend/src

# frontend/src/wagmiClient.ts
cat > $BASE_DIR/frontend/src/wagmiClient.ts <<'EOF'
import { configureChains, createClient } from 'wagmi';
import { mainnet, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  walletConnectWallet,
  rainbowWallet,
} from '@rainbow-me/rainbowkit/wallets';

const { chains, provider } = configureChains(
  [mainnet, goerli],
  [publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ chains }),
      walletConnectWallet({ chains }),
      rainbowWallet({ chains }),
    ],
  },
]);

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export { chains };
EOF

# frontend/src/App.tsx
cat > $BASE_DIR/frontend/src/App.tsx <<'EOF'
import React from 'react';
import { WagmiConfig } from 'wagmi';
import { RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit';
import { wagmiClient, chains } from './wagmiClient';

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div style={{ padding: 20 }}>
          <h1>Boomchainlab EVM Web3 Starter</h1>
          <ConnectButton />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
EOF

# frontend/package.json
cat > $BASE_DIR/frontend/package.json <<'EOF'
{
  "name": "frontend",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@rainbow-me/rainbowkit": "^0.8.7",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "wagmi": "^1.2.6"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.0.0"
  }
}
EOF

# frontend/vite.config.ts
cat > $BASE_DIR/frontend/vite.config.ts <<'EOF'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
EOF

echo "Boomchainlab EVM Web3 Starter scaffold created in ./$BASE_DIR"
