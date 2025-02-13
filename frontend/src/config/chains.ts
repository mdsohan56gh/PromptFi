/**
 * Blockchain network configuration
 */

export const chains = {
  localhost: {
    id: 1337,
    name: 'Localhost',
    network: 'localhost',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH'
    },
    rpcUrls: {
      default: { http: ['http://127.0.0.1:8545'] },
      public: { http: ['http://127.0.0.1:8545'] }
    }
  },
  mumbai: {
    id: 80001,
    name: 'Polygon Mumbai',
    network: 'maticmum',
    nativeCurrency: {
      decimals: 18,
      name: 'MATIC',
      symbol: 'MATIC'
    },
    rpcUrls: {
      default: { http: ['https://rpc-mumbai.maticvigil.com'] },
      public: { http: ['https://rpc-mumbai.maticvigil.com'] }
    },
    blockExplorers: {
      default: { name: 'PolygonScan', url: 'https://mumbai.polygonscan.com' }
    },
    testnet: true
  },
  polygon: {
    id: 137,
    name: 'Polygon',
    network: 'matic',
    nativeCurrency: {
      decimals: 18,
      name: 'MATIC',
      symbol: 'MATIC'
    },
    rpcUrls: {
      default: { http: ['https://polygon-rpc.com'] },
      public: { http: ['https://polygon-rpc.com'] }
    },
    blockExplorers: {
      default: { name: 'PolygonScan', url: 'https://polygonscan.com' }
    }
  }
};

export const defaultChain = chains.localhost;

