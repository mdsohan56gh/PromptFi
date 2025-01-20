const hre = require("hardhat");

/**
 * Setup script for initializing contracts after deployment
 */
async function main() {
  console.log("Setting up PromptFi contracts...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Using account:", deployer.address);

  // Load deployed addresses (replace with your actual addresses)
  const addresses = {
    promptNFT: process.env.PROMPTNFT_ADDRESS,
    usageTracker: process.env.USAGETRACKER_ADDRESS,
    revenueSplitter: process.env.REVENUESPLITTER_ADDRESS,
    creatorRegistry: process.env.CREATORREGISTRY_ADDRESS
  };

  // Get contract instances
  const promptNFT = await hre.ethers.getContractAt("PromptNFT", addresses.promptNFT);
  const usageTracker = await hre.ethers.getContractAt("UsageTracker", addresses.usageTracker);
  const revenueSplitter = await hre.ethers.getContractAt("RevenueSplitter", addresses.revenueSplitter);
  const creatorRegistry = await hre.ethers.getContractAt("CreatorRegistry", addresses.creatorRegistry);

  console.log("\nAuthorizing contracts...");

  // Authorize UsageTracker to update CreatorRegistry
  console.log("Authorizing UsageTracker...");
  await creatorRegistry.authorizeUpdater(addresses.usageTracker);

  // Authorize PromptNFT to update CreatorRegistry
  console.log("Authorizing PromptNFT...");
  await creatorRegistry.authorizeUpdater(addresses.promptNFT);

  console.log("\n✓ Setup complete!");
  console.log("\nContract addresses:");
  console.log("PromptNFT:", addresses.promptNFT);
  console.log("UsageTracker:", addresses.usageTracker);
  console.log("RevenueSplitter:", addresses.revenueSplitter);
  console.log("CreatorRegistry:", addresses.creatorRegistry);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

