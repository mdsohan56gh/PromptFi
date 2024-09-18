/**
 * Application constants
 */

export const APP_NAME = 'PromptFi';
export const APP_DESCRIPTION = 'AI Prompt Tokenization & Usage Protocol';

export const CHAIN_IDS = {
  LOCALHOST: 1337,
  ETHEREUM: 1,
  POLYGON: 137,
  MUMBAI: 80001,
  ARBITRUM: 42161,
  OPTIMISM: 10
};

export const SUPPORTED_CHAINS = [
  {
    id: CHAIN_IDS.LOCALHOST,
    name: 'Localhost',
    rpcUrl: 'http://localhost:8545',
    blockExplorer: ''
  },
  {
    id: CHAIN_IDS.MUMBAI,
    name: 'Polygon Mumbai',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
    blockExplorer: 'https://mumbai.polygonscan.com'
  }
];

export const MODEL_TYPES = [
  { value: 'GPT-4', label: 'GPT-4' },
  { value: 'GPT-3.5', label: 'GPT-3.5' },
  { value: 'Claude', label: 'Claude' },
  { value: 'Llama', label: 'Llama' },
  { value: 'Other', label: 'Other' }
];

export const PROMPT_CATEGORIES = [
  { value: 'Coding', label: 'Coding & Development' },
  { value: 'Writing', label: 'Writing & Content' },
  { value: 'Marketing', label: 'Marketing & SEO' },
  { value: 'Design', label: 'Design & Creative' },
  { value: 'Education', label: 'Education & Learning' },
  { value: 'Business', label: 'Business & Finance' },
  { value: 'Other', label: 'Other' }
];

export const ROYALTY_OPTIONS = [
  { value: 500, label: '5%' },
  { value: 1000, label: '10%' },
  { value: 1500, label: '15%' },
  { value: 2000, label: '20%' },
  { value: 2500, label: '25%' }
];

export const DEFAULT_ROYALTY = 1000; // 10%

export const REVENUE_SPLIT = {
  CREATOR: 7000, // 70%
  PLATFORM: 2000, // 20%
  TREASURY: 1000 // 10%
};

export const IPFS_GATEWAYS = [
  'https://gateway.pinata.cloud/ipfs/',
  'https://ipfs.io/ipfs/',
  'https://cloudflare-ipfs.com/ipfs/'
];

export const MAX_PROMPT_LENGTH = 5000;
export const MIN_PROMPT_LENGTH = 10;
export const MAX_TITLE_LENGTH = 100;
export const MAX_DESCRIPTION_LENGTH = 500;
export const MAX_TAGS = 10;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100
};

