# Deployment Guide

## Prerequisites

- Node.js >= 18.0.0
- Hardhat
- Private key with testnet/mainnet ETH
- Etherscan API key (for verification)

## Smart Contract Deployment

### 1. Configure Environment

Create `.env` file in the root directory:

```bash
PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key
POLYGON_RPC_URL=your_polygon_rpc_url
MUMBAI_RPC_URL=your_mumbai_rpc_url
```

### 2. Compile Contracts

```bash
npx hardhat compile
```

### 3. Deploy to Local Network

```bash
# Terminal 1: Start local node
npx hardhat node

# Terminal 2: Deploy contracts
npx hardhat run scripts/deploy.js --network localhost
```

### 4. Deploy to Testnet (Mumbai)

```bash
npx hardhat run scripts/deploy.js --network mumbai
```

### 5. Deploy to Mainnet (Polygon)

```bash
npx hardhat run scripts/deploy.js --network polygon
```

### 6. Verify Contracts

```bash
# Set environment variables
export PROMPTNFT_ADDRESS=0x...
export USAGETRACKER_ADDRESS=0x...
export REVENUESPLITTER_ADDRESS=0x...
export CREATORREGISTRY_ADDRESS=0x...
export PLATFORM_ADDRESS=0x...
export TREASURY_ADDRESS=0x...

# Run verification
npx hardhat run scripts/verify.js --network mumbai
```

## Frontend Deployment

### 1. Configure Environment

Create `frontend/.env.local`:

```bash
NEXT_PUBLIC_PROMPTNFT_ADDRESS=0x...
NEXT_PUBLIC_USAGETRACKER_ADDRESS=0x...
NEXT_PUBLIC_REVENUESPLITTER_ADDRESS=0x...
NEXT_PUBLIC_CREATORREGISTRY_ADDRESS=0x...
NEXT_PUBLIC_CHAIN_ID=80001
NEXT_PUBLIC_IPFS_GATEWAY=https://gateway.pinata.cloud/ipfs/
NEXT_PUBLIC_PINATA_API_KEY=your_api_key
```

### 2. Build Frontend

```bash
cd frontend
npm install
npm run build
```

### 3. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or use the Vercel dashboard:
1. Import GitHub repository
2. Set environment variables
3. Deploy

### 4. Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

## Post-Deployment Checklist

- [ ] Verify all contracts on block explorer
- [ ] Test mint functionality
- [ ] Test usage tracking
- [ ] Test revenue distribution
- [ ] Test marketplace
- [ ] Update frontend contract addresses
- [ ] Configure IPFS/Pinata
- [ ] Set up monitoring
- [ ] Update documentation

## Monitoring

### Contract Events

Monitor these events for system health:
- PromptMinted
- PromptUsed
- RevenueDistributed
- ListingCreated
- PurchaseMade

### Tools

- **Tenderly**: Contract monitoring and alerting
- **The Graph**: Event indexing and querying
- **Etherscan**: Transaction tracking
- **Sentry**: Frontend error tracking

## Troubleshooting

### Common Issues

**Contract deployment fails:**
- Check you have sufficient funds for gas
- Verify RPC URL is correct
- Ensure private key is valid

**Verification fails:**
- Wait 1-2 minutes after deployment
- Ensure constructor arguments match
- Check Etherscan API key is valid

**Frontend can't connect to contracts:**
- Verify contract addresses are correct
- Check chain ID matches
- Ensure wallet is connected to correct network

## Security Considerations

1. **Never commit private keys** - Use environment variables
2. **Verify contracts** - Always verify on Etherscan
3. **Test thoroughly** - Deploy to testnet first
4. **Monitor events** - Set up alerting for unusual activity
5. **Keep dependencies updated** - Regularly update packages

## Rollback Procedure

If you need to rollback:

1. Pause contract functionality (if implemented)
2. Deploy new version
3. Migrate data if necessary
4. Update frontend
5. Notify users

## Maintenance

### Regular Tasks

- Monitor gas costs
- Check for failed transactions
- Review event logs
- Update documentation
- Backup important data
- Security audits

### Upgrade Path

For contract upgrades:
1. Deploy new contracts
2. Test extensively
3. Migrate data
4. Update frontend
5. Deprecate old contracts

