# PromptFi Frontend

This is the frontend application for PromptFi built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Browse and discover AI prompts
- Create and mint prompt NFTs
- Track usage and earnings
- Creator dashboard with analytics
- Wallet integration with MetaMask
- IPFS integration for metadata storage

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Installation

```bash
npm install
```

### Configuration

Create a `.env.local` file:

```env
NEXT_PUBLIC_PROMPTNFT_ADDRESS=0x...
NEXT_PUBLIC_USAGETRACKER_ADDRESS=0x...
NEXT_PUBLIC_REVENUESPLITTER_ADDRESS=0x...
NEXT_PUBLIC_CREATORREGISTRY_ADDRESS=0x...
NEXT_PUBLIC_CHAIN_ID=1337
NEXT_PUBLIC_IPFS_GATEWAY=https://gateway.pinata.cloud/ipfs/
NEXT_PUBLIC_PINATA_API_KEY=your_api_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm run start
```

## Project Structure

```
frontend/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Next.js pages
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript types
│   ├── constants/      # Constants
│   └── styles/         # CSS styles
├── public/             # Static files
└── package.json
```

## Technologies

- **Next.js 14**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **wagmi**: Ethereum library
- **viem**: Ethereum utilities
- **ethers.js**: Blockchain interactions

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [wagmi Documentation](https://wagmi.sh)
- [Tailwind CSS](https://tailwindcss.com/docs)

