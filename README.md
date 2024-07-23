# PromptFi

AI Prompt Tokenization & Usage Protocol

## Overview

PromptFi is a Web3 protocol that transforms AI Prompts into verifiable, tradeable, and monetizable digital assets through blockchain technology. It enables creators to mint their prompts as ERC-1155 tokens and earn revenue when others use them.

## Features

- **Prompt Tokenization**: Mint AI prompts as NFTs using ERC-1155 standard
- **Usage Tracking**: On-chain recording of prompt usage and metrics
- **Revenue Distribution**: Automatic royalty splitting between creators, platform, and treasury
- **Decentralized Storage**: IPFS/Arweave integration for prompt metadata
- **Cross-chain Support**: Multi-chain deployment capability

## Technology Stack

- **Smart Contracts**: Solidity, Hardhat, OpenZeppelin
- **Frontend**: Next.js, wagmi, viem
- **Storage**: IPFS, Arweave
- **Indexing**: The Graph
- **Testing**: Foundry, Hardhat

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- MetaMask or another Web3 wallet

### Installation

1. Clone the repository
```bash
git clone https://github.com/mdsohan56gh/PromptFi.git
cd PromptFi
```

2. Install dependencies
```bash
npm install
```

3. Compile smart contracts
```bash
npx hardhat compile
```

4. Run tests
```bash
npx hardhat test
```

5. Deploy contracts (local)
```bash
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

### Frontend Setup

1. Navigate to frontend directory
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Create `.env.local` file with required environment variables
```
NEXT_PUBLIC_PROMPTNFT_ADDRESS=0x...
NEXT_PUBLIC_USAGETRACKER_ADDRESS=0x...
NEXT_PUBLIC_REVENUESPLITTER_ADDRESS=0x...
NEXT_PUBLIC_CREATORREGISTRY_ADDRESS=0x...
NEXT_PUBLIC_CHAIN_ID=1337
```

4. Run development server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the app.

## Smart Contracts

- **PromptNFT**: ERC-1155 token contract for prompt NFTs
- **UsageTracker**: Records prompt usage events
- **RevenueSplitter**: Manages revenue distribution
- **CreatorRegistry**: Handles creator profiles and reputation

## Documentation

- [API Documentation](docs/API.md)
- [Architecture Overview](docs/ARCHITECTURE.md)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

