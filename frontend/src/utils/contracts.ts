export const CONTRACTS = {
  PromptNFT: {
    address: process.env.NEXT_PUBLIC_PROMPTNFT_ADDRESS || '',
    abi: [] // Will be populated from artifacts
  },
  UsageTracker: {
    address: process.env.NEXT_PUBLIC_USAGETRACKER_ADDRESS || '',
    abi: []
  },
  RevenueSplitter: {
    address: process.env.NEXT_PUBLIC_REVENUESPLITTER_ADDRESS || '',
    abi: []
  },
  CreatorRegistry: {
    address: process.env.NEXT_PUBLIC_CREATORREGISTRY_ADDRESS || '',
    abi: []
  }
};

export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '1337');

export const SUPPORTED_CHAINS = [
  {
    id: 1337,
    name: 'Localhost',
    rpcUrl: 'http://localhost:8545'
  },
  {
    id: 80001,
    name: 'Polygon Mumbai',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com'
  }
];

