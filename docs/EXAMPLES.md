# Usage Examples

## Minting a Prompt NFT

```javascript
const promptContent = "Generate a blog post about blockchain technology";
const promptHash = ethers.keccak256(ethers.toUtf8Bytes(promptContent));

const tx = await promptNFT.mintPromptNFT(
  promptHash,
  "GPT-4",
  1000, // 10% royalty
  "ipfs://QmExample123"
);

await tx.wait();
console.log("Prompt minted successfully!");
```

## Recording Prompt Usage

```javascript
await usageTracker.recordUsage(
  promptId,
  userAddress,
  ethers.parseEther("0.01"),
  "session-123"
);
```

## Distributing Revenue

```javascript
await revenueSplitter.distributeRevenue(creatorAddress, {
  value: ethers.parseEther("0.1")
});
```

## Withdrawing Earnings

```javascript
const earnings = await revenueSplitter.getAvailableEarnings(myAddress);
console.log("Available:", ethers.formatEther(earnings), "ETH");

await revenueSplitter.withdrawEarnings();
```

