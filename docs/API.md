# PromptFi API Documentation

## Smart Contract API

### PromptNFT Contract

#### Functions

##### mintPromptNFT
```solidity
function mintPromptNFT(
    bytes32 promptHash,
    string memory modelType,
    uint256 royaltyRatio,
    string memory metadataURI
) external nonReentrant returns (uint256)
```

Mints a new Prompt NFT token.

**Parameters:**
- `promptHash`: Keccak256 hash of the prompt content
- `modelType`: AI model type (e.g., "GPT-4", "Claude")
- `royaltyRatio`: Royalty percentage in basis points (0-10000)
- `metadataURI`: IPFS or Arweave URI for metadata

**Returns:** Token ID of the newly minted NFT

**Events:** Emits `PromptMinted` event

---

##### recordUsage
```solidity
function recordUsage(uint256 tokenId) external
```

Records a usage of the prompt.

**Parameters:**
- `tokenId`: The ID of the prompt token

**Events:** Emits `PromptUsed` event

---

##### getPromptMetadata
```solidity
function getPromptMetadata(uint256 tokenId) external view returns (PromptMetadata memory)
```

Retrieves metadata for a prompt.

**Parameters:**
- `tokenId`: The ID of the prompt token

**Returns:** PromptMetadata struct containing all metadata

---

### UsageTracker Contract

#### Functions

##### recordUsage
```solidity
function recordUsage(
    uint256 promptId,
    address caller,
    uint256 fee,
    string memory sessionId
) external onlyAuthorized nonReentrant
```

Records a prompt usage event.

**Parameters:**
- `promptId`: ID of the prompt being used
- `caller`: Address of the user
- `fee`: Fee paid for usage
- `sessionId`: Optional session identifier

**Events:** Emits `UsageRecorded` event

---

##### getPromptUsageCount
```solidity
function getPromptUsageCount(uint256 promptId) external view returns (uint256)
```

Gets total usage count for a prompt.

**Parameters:**
- `promptId`: The prompt ID

**Returns:** Total usage count

---

##### getPromptUsageRecords
```solidity
function getPromptUsageRecords(
    uint256 promptId,
    uint256 offset,
    uint256 limit
) external view returns (UsageRecord[] memory)
```

Retrieves usage records with pagination.

**Parameters:**
- `promptId`: The prompt ID
- `offset`: Starting index
- `limit`: Maximum records to return

**Returns:** Array of usage records

---

### RevenueSplitter Contract

#### Functions

##### distributeRevenue
```solidity
function distributeRevenue(address creator) external payable nonReentrant
```

Distributes revenue between creator, platform, and treasury.

**Parameters:**
- `creator`: Address of the prompt creator

**Events:** Emits `RevenueDistributed` event

---

##### withdrawEarnings
```solidity
function withdrawEarnings() external nonReentrant
```

Allows creators to withdraw their accumulated earnings.

**Events:** Emits `EarningsWithdrawn` event

---

##### getAvailableEarnings
```solidity
function getAvailableEarnings(address creator) external view returns (uint256)
```

Gets available earnings for a creator.

**Parameters:**
- `creator`: Creator address

**Returns:** Available earnings amount

---

### CreatorRegistry Contract

#### Functions

##### registerCreator
```solidity
function registerCreator(string memory username, string memory profileURI) external
```

Registers a new creator profile.

**Parameters:**
- `username`: Unique username
- `profileURI`: IPFS/Arweave URI for profile data

**Events:** Emits `CreatorRegistered` event

---

##### updateProfile
```solidity
function updateProfile(string memory profileURI) external
```

Updates creator profile URI.

**Parameters:**
- `profileURI`: New profile URI

**Events:** Emits `ProfileUpdated` event

---

##### getCreatorProfile
```solidity
function getCreatorProfile(address creator) external view returns (CreatorProfile memory)
```

Retrieves a creator's profile.

**Parameters:**
- `creator`: Creator address

**Returns:** CreatorProfile struct

---

## Events

### PromptNFT Events

#### PromptMinted
```solidity
event PromptMinted(
    uint256 indexed tokenId,
    address indexed creator,
    bytes32 promptHash,
    string modelType,
    string metadataURI
)
```

#### PromptUsed
```solidity
event PromptUsed(
    uint256 indexed tokenId,
    address indexed user,
    uint256 timestamp
)
```

### UsageTracker Events

#### UsageRecorded
```solidity
event UsageRecorded(
    uint256 indexed promptId,
    address indexed caller,
    uint256 fee,
    uint256 timestamp,
    string sessionId
)
```

### RevenueSplitter Events

#### RevenueDistributed
```solidity
event RevenueDistributed(
    address indexed creator,
    uint256 creatorAmount,
    uint256 platformAmount,
    uint256 treasuryAmount,
    uint256 totalAmount
)
```

#### EarningsWithdrawn
```solidity
event EarningsWithdrawn(
    address indexed creator,
    uint256 amount
)
```

### CreatorRegistry Events

#### CreatorRegistered
```solidity
event CreatorRegistered(
    address indexed creator,
    string username,
    uint256 timestamp
)
```

#### CreatorVerified
```solidity
event CreatorVerified(
    address indexed creator
)
```

## Error Codes

- `Prompt already exists`: Attempting to mint duplicate prompt
- `Invalid royalty ratio`: Royalty ratio exceeds 100%
- `Prompt does not exist`: Accessing non-existent prompt
- `Caller not authorized`: Unauthorized access attempt
- `No earnings available`: No earnings to withdraw
- `Creator already registered`: Duplicate registration attempt
- `Username taken`: Username already in use

