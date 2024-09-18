/**
 * Type definitions for PromptFi
 */

export interface Prompt {
  tokenId: number;
  title: string;
  description: string;
  promptContent: string;
  modelType: string;
  tags: string[];
  creator: string;
  usageCount: number;
  royaltyRatio: number;
  metadataURI: string;
  createdAt: number;
}

export interface Creator {
  address: string;
  username: string;
  profileURI: string;
  totalPrompts: number;
  totalUsage: number;
  totalEarnings: string;
  reputationScore: number;
  joinedAt: number;
  isVerified: boolean;
}

export interface UsageRecord {
  promptId: number;
  caller: string;
  timestamp: number;
  fee: string;
  sessionId: string;
}

export interface Listing {
  listingId: number;
  promptId: number;
  seller: string;
  price: string;
  duration: number;
  active: boolean;
  createdAt: number;
}

export interface Purchase {
  purchaseId: number;
  listingId: number;
  buyer: string;
  expiresAt: number;
  purchasedAt: number;
}

export interface RevenueEvent {
  creator: string;
  creatorAmount: string;
  platformAmount: string;
  treasuryAmount: string;
  totalAmount: string;
  timestamp: number;
}

export enum ModelType {
  GPT4 = 'GPT-4',
  GPT35 = 'GPT-3.5',
  CLAUDE = 'Claude',
  LLAMA = 'Llama',
  OTHER = 'Other'
}

export enum PromptCategory {
  CODING = 'Coding',
  WRITING = 'Writing',
  MARKETING = 'Marketing',
  DESIGN = 'Design',
  EDUCATION = 'Education',
  BUSINESS = 'Business',
  OTHER = 'Other'
}

export interface FilterOptions {
  modelType?: ModelType;
  category?: PromptCategory;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'recent' | 'popular' | 'earnings';
  verified?: boolean;
}

