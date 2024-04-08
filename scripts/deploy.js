const hre = require("hardhat");

async function main() {
  console.log("Starting PromptFi deployment...");

  // Get deployment account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy PromptNFT
  console.log("\nDeploying PromptNFT...");
  const PromptNFT = await hre.ethers.getContractFactory("PromptNFT");
  const promptNFT = await PromptNFT.deploy();
  await promptNFT.waitForDeployment();
  const promptNFTAddress = await promptNFT.getAddress();
  console.log("PromptNFT deployed to:", promptNFTAddress);

  // Deploy UsageTracker
  console.log("\nDeploying UsageTracker...");
  const UsageTracker = await hre.ethers.getContractFactory("UsageTracker");
  const usageTracker = await UsageTracker.deploy();
  await usageTracker.waitForDeployment();
  const usageTrackerAddress = await usageTracker.getAddress();
  console.log("UsageTracker deployed to:", usageTrackerAddress);

  // Deploy RevenueSplitter
  console.log("\nDeploying RevenueSplitter...");
  const platformAddress = deployer.address; // For testing
  const treasuryAddress = deployer.address; // For testing
  
  const RevenueSplitter = await hre.ethers.getContractFactory("RevenueSplitter");
  const revenueSplitter = await RevenueSplitter.deploy(platformAddress, treasuryAddress);
  await revenueSplitter.waitForDeployment();
  const revenueSplitterAddress = await revenueSplitter.getAddress();
  console.log("RevenueSplitter deployed to:", revenueSplitterAddress);

  // Deploy CreatorRegistry
  console.log("\nDeploying CreatorRegistry...");
  const CreatorRegistry = await hre.ethers.getContractFactory("CreatorRegistry");
  const creatorRegistry = await CreatorRegistry.deploy();
  await creatorRegistry.waitForDeployment();
  const creatorRegistryAddress = await creatorRegistry.getAddress();
  console.log("CreatorRegistry deployed to:", creatorRegistryAddress);

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    deployer: deployer.address,
    contracts: {
      PromptNFT: promptNFTAddress,
      UsageTracker: usageTrackerAddress,
      RevenueSplitter: revenueSplitterAddress,
      CreatorRegistry: creatorRegistryAddress
    },
    timestamp: new Date().toISOString()
  };

  console.log("\n=== Deployment Complete ===");
  console.log(JSON.stringify(deploymentInfo, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

