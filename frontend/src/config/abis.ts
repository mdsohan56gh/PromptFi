/**
 * Contract ABIs
 * In production, import from compiled artifacts
 */

export const PROMPT_NFT_ABI = [
  'function mintPromptNFT(bytes32 promptHash, string modelType, uint256 royaltyRatio, string metadataURI) returns (uint256)',
  'function recordUsage(uint256 tokenId)',
  'function getPromptMetadata(uint256 tokenId) view returns (tuple(bytes32 promptHash, string modelType, address creator, uint256 usageCount, uint256 royaltyRatio, string metadataURI, uint256 createdAt, bool exists))',
  'function getTotalPrompts() view returns (uint256)',
  'event PromptMinted(uint256 indexed tokenId, address indexed creator, bytes32 promptHash, string modelType, string metadataURI)',
  'event PromptUsed(uint256 indexed tokenId, address indexed user, uint256 timestamp)'
];

export const USAGE_TRACKER_ABI = [
  'function recordUsage(uint256 promptId, address caller, uint256 fee, string sessionId)',
  'function getPromptUsageCount(uint256 promptId) view returns (uint256)',
  'function getCallerTotalCalls(address caller) view returns (uint256)',
  'event UsageRecorded(uint256 indexed promptId, address indexed caller, uint256 fee, uint256 timestamp, string sessionId)'
];

export const REVENUE_SPLITTER_ABI = [
  'function distributeRevenue(address creator) payable',
  'function withdrawEarnings()',
  'function getAvailableEarnings(address creator) view returns (uint256)',
  'event RevenueDistributed(address indexed creator, uint256 creatorAmount, uint256 platformAmount, uint256 treasuryAmount, uint256 totalAmount)',
  'event EarningsWithdrawn(address indexed creator, uint256 amount)'
];

export const CREATOR_REGISTRY_ABI = [
  'function registerCreator(string username, string profileURI)',
  'function updateProfile(string profileURI)',
  'function getCreatorProfile(address creator) view returns (tuple(address creatorAddress, string username, string profileURI, uint256 totalPrompts, uint256 totalUsage, uint256 totalEarnings, uint256 reputationScore, uint256 joinedAt, bool isVerified, bool exists))',
  'function isCreatorRegistered(address creator) view returns (bool)',
  'event CreatorRegistered(address indexed creator, string username, uint256 timestamp)'
];

