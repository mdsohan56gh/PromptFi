const hre = require("hardhat");

/**
 * Generate gas usage report for contracts
 */
async function main() {
  console.log("Generating gas usage report...\n");

  const [deployer] = await hre.ethers.getSigners();

  // Deploy contracts and measure gas
  const contracts = [];

  // PromptNFT
  console.log("Deploying PromptNFT...");
  const PromptNFT = await hre.ethers.getContractFactory("PromptNFT");
  const promptNFT = await PromptNFT.deploy();
  const promptNFTReceipt = await promptNFT.deploymentTransaction().wait();
  contracts.push({
    name: "PromptNFT",
    gasUsed: promptNFTReceipt.gasUsed.toString()
  });

  // UsageTracker
  console.log("Deploying UsageTracker...");
  const UsageTracker = await hre.ethers.getContractFactory("UsageTracker");
  const usageTracker = await UsageTracker.deploy();
  const usageTrackerReceipt = await usageTracker.deploymentTransaction().wait();
  contracts.push({
    name: "UsageTracker",
    gasUsed: usageTrackerReceipt.gasUsed.toString()
  });

  // RevenueSplitter
  console.log("Deploying RevenueSplitter...");
  const RevenueSplitter = await hre.ethers.getContractFactory("RevenueSplitter");
  const revenueSplitter = await RevenueSplitter.deploy(deployer.address, deployer.address);
  const revenueSplitterReceipt = await revenueSplitter.deploymentTransaction().wait();
  contracts.push({
    name: "RevenueSplitter",
    gasUsed: revenueSplitterReceipt.gasUsed.toString()
  });

  // CreatorRegistry
  console.log("Deploying CreatorRegistry...");
  const CreatorRegistry = await hre.ethers.getContractFactory("CreatorRegistry");
  const creatorRegistry = await CreatorRegistry.deploy();
  const creatorRegistryReceipt = await creatorRegistry.deploymentTransaction().wait();
  contracts.push({
    name: "CreatorRegistry",
    gasUsed: creatorRegistryReceipt.gasUsed.toString()
  });

  // Print report
  console.log("\n=== Gas Usage Report ===\n");
  console.log("Contract".padEnd(25), "Gas Used");
  console.log("─".repeat(45));
  
  contracts.forEach(contract => {
    console.log(
      contract.name.padEnd(25),
      parseInt(contract.gasUsed).toLocaleString()
    );
  });

  console.log("\n=== Report Complete ===\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

