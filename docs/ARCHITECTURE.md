# PromptFi Architecture

## System Overview

PromptFi is a decentralized protocol for AI prompt tokenization, usage tracking, and revenue distribution. The system combines smart contracts, decentralized storage, and a modern web frontend.

## Core Components

### 1. Smart Contracts Layer

#### PromptNFT Contract
- **Purpose**: Manages ERC-1155 tokens representing AI prompts
- **Key Features**:
  - Mint prompts as NFTs with metadata
  - Store prompt hash for copyright verification
  - Track usage count per prompt
  - Prevent duplicate prompt registration
  - Support multiple model types

#### UsageTracker Contract
- **Purpose**: Records and indexes prompt usage events
- **Key Features**:
  - Log each prompt usage with caller, fee, timestamp
  - Maintain usage statistics per prompt and user
  - Support session tracking
  - Authorization system for callers
  - Pagination for historical data retrieval

#### RevenueSplitter Contract
- **Purpose**: Manages automatic revenue distribution
- **Key Features**:
  - Split payments between creator (70%), platform (20%), treasury (10%)
  - Pull payment pattern for security
  - Configurable share percentages
  - Track accumulated earnings
  - Prevent reentrancy attacks

#### CreatorRegistry Contract
- **Purpose**: Manages creator profiles and reputation
- **Key Features**:
  - Unique username registration
  - Profile metadata storage (IPFS/Arweave)
  - Track creator statistics (prompts, usage, earnings)
  - Reputation scoring system
  - Creator verification mechanism

### 2. Storage Layer

#### IPFS / Arweave
- Stores prompt metadata JSON
- Stores creator profile information
- Ensures decentralized content availability
- Provides permanent storage for critical data

**Metadata Structure:**
```json
{
  "name": "Prompt Title",
  "description": "Prompt description",
  "promptContent": "The actual prompt text",
  "modelType": "GPT-4",
  "tags": ["category1", "category2"],
  "createdAt": "2024-01-01T00:00:00Z",
  "creator": "0x..."
}
```

### 3. Indexing Layer

#### The Graph (Subgraph)
- Indexes blockchain events in real-time
- Provides GraphQL API for queries
- Tracks:
  - All prompt minting events
  - Usage records
  - Revenue distributions
  - Creator registrations

**Key Entities:**
- Prompt
- Creator
- UsageRecord
- RevenueEvent

### 4. Frontend Layer

#### Technology Stack
- **Framework**: Next.js 14
- **Web3**: wagmi, viem
- **Wallet**: RainbowKit
- **Styling**: Tailwind CSS
- **Language**: TypeScript

#### Key Pages
- **Home**: Landing page with features overview
- **Explore**: Browse all prompts with filters
- **Create**: Mint new prompt NFTs
- **Profile**: View creator stats and earnings
- **Dashboard**: Analytics and usage statistics

#### Components
- PromptCard: Display prompt information
- CreatePromptForm: Form for minting prompts
- WalletConnect: Wallet connection UI
- EarningsDisplay: Show creator earnings

## Data Flow

### Minting a Prompt

```
User Input → Upload to IPFS → Get CID → Call mintPromptNFT()
                                              ↓
                                    Emit PromptMinted Event
                                              ↓
                                    Subgraph Indexes Event
                                              ↓
                                    Frontend Updates
```

### Using a Prompt

```
User Calls Prompt → Pay Fee → Call recordUsage() + distributeRevenue()
                                        ↓
                    Split: Creator (70%) | Platform (20%) | Treasury (10%)
                                        ↓
                            Emit UsageRecorded + RevenueDistributed
                                        ↓
                                Update Usage Stats
```

### Withdrawing Earnings

```
Creator Views Earnings → Click Withdraw → Call withdrawEarnings()
                                                  ↓
                                        Transfer ETH to Creator
                                                  ↓
                                        Emit EarningsWithdrawn
```

## Security Considerations

### Smart Contract Security
- **ReentrancyGuard**: Prevents reentrancy attacks on financial functions
- **Ownable**: Access control for admin functions
- **Pull Payment**: Creators pull earnings instead of automatic push
- **Input Validation**: All inputs are validated before processing
- **Event Logging**: All critical actions emit events for transparency

### Testing Strategy
- Unit tests for all contract functions
- Integration tests for contract interactions
- Edge case testing (overflow, underflow, zero values)
- Gas optimization testing
- Security audit with Slither/Mythril

## Scalability

### Multi-chain Deployment
- Support for Ethereum mainnet
- L2 solutions: Polygon, Arbitrum, Optimism
- Cross-chain communication via LayerZero

### Gas Optimization
- Efficient data structures
- Batch operations where possible
- Minimal storage writes
- Use of events for historical data

### Caching Strategy
- Subgraph for query optimization
- Frontend caching with React Query
- IPFS gateway caching
- CDN for static assets

## Future Enhancements

### Phase 1 (Current)
- ✅ Core contracts implementation
- ✅ Basic frontend
- ✅ IPFS integration
- ✅ Testing suite

### Phase 2
- [ ] AI model integration (OpenAI, Claude, Llama)
- [ ] Prompt marketplace
- [ ] Advanced search and filtering
- [ ] Social features (likes, comments)

### Phase 3
- [ ] Prompt bundles/collections
- [ ] Prompt mining/staking mechanism
- [ ] Cross-chain bridges
- [ ] Mobile app

### Phase 4
- [ ] DAO governance
- [ ] Revenue sharing for curators
- [ ] Advanced analytics dashboard
- [ ] API for third-party integration

## Deployment Architecture

```
┌─────────────────┐
│   Frontend      │
│   (Next.js)     │
└────────┬────────┘
         │
         ├─────────────────┐
         │                 │
    ┌────▼────┐      ┌────▼────┐
    │  Wallet │      │  IPFS   │
    │ (MetaMask) │   │ Gateway │
    └────┬────┘      └─────────┘
         │
    ┌────▼────────────────┐
    │   Smart Contracts   │
    ├─────────────────────┤
    │  - PromptNFT       │
    │  - UsageTracker    │
    │  - RevenueSplitter │
    │  - CreatorRegistry │
    └────┬────────────────┘
         │
    ┌────▼────┐
    │ Subgraph│
    │ (TheGraph)│
    └─────────┘
```

## Environment Configuration

### Required Environment Variables

**Smart Contracts:**
- `PRIVATE_KEY`: Deployer private key
- `ETHERSCAN_API_KEY`: For contract verification
- `POLYGON_RPC_URL`: RPC endpoint

**Frontend:**
- `NEXT_PUBLIC_PROMPTNFT_ADDRESS`: PromptNFT contract address
- `NEXT_PUBLIC_USAGETRACKER_ADDRESS`: UsageTracker contract address
- `NEXT_PUBLIC_REVENUESPLITTER_ADDRESS`: RevenueSplitter contract address
- `NEXT_PUBLIC_CREATORREGISTRY_ADDRESS`: CreatorRegistry contract address
- `NEXT_PUBLIC_CHAIN_ID`: Target chain ID
- `NEXT_PUBLIC_IPFS_GATEWAY`: IPFS gateway URL
- `NEXT_PUBLIC_PINATA_API_KEY`: Pinata API key for uploads

## Monitoring and Analytics

### On-chain Metrics
- Total prompts minted
- Total usage count
- Total revenue generated
- Active creators count
- Average prompt usage

### Frontend Metrics
- Page views and user engagement
- Wallet connection rate
- Transaction success rate
- Error rates and types

### Smart Contract Events
All events are logged and monitored for:
- Unusual activity patterns
- Failed transactions
- Gas usage optimization
- Revenue distribution accuracy

