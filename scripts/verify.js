const hre = require("hardhat");

async function main() {
  // Contract addresses (replace with actual deployed addresses)
  const PROMPTNFT_ADDRESS = process.env.PROMPTNFT_ADDRESS || "";
  const USAGETRACKER_ADDRESS = process.env.USAGETRACKER_ADDRESS || "";
  const REVENUESPLITTER_ADDRESS = process.env.REVENUESPLITTER_ADDRESS || "";
  const CREATORREGISTRY_ADDRESS = process.env.CREATORREGISTRY_ADDRESS || "";

  console.log("Verifying contracts on Etherscan...");

  // Verify PromptNFT
  if (PROMPTNFT_ADDRESS) {
    try {
      console.log("\nVerifying PromptNFT...");
      await hre.run("verify:verify", {
        address: PROMPTNFT_ADDRESS,
        constructorArguments: [],
      });
      console.log("PromptNFT verified!");
    } catch (error) {
      console.error("Error verifying PromptNFT:", error.message);
    }
  }

  // Verify UsageTracker
  if (USAGETRACKER_ADDRESS) {
    try {
      console.log("\nVerifying UsageTracker...");
      await hre.run("verify:verify", {
        address: USAGETRACKER_ADDRESS,
        constructorArguments: [],
      });
      console.log("UsageTracker verified!");
    } catch (error) {
      console.error("Error verifying UsageTracker:", error.message);
    }
  }

  // Verify RevenueSplitter
  if (REVENUESPLITTER_ADDRESS) {
    const platformAddress = process.env.PLATFORM_ADDRESS || "";
    const treasuryAddress = process.env.TREASURY_ADDRESS || "";

    try {
      console.log("\nVerifying RevenueSplitter...");
      await hre.run("verify:verify", {
        address: REVENUESPLITTER_ADDRESS,
        constructorArguments: [platformAddress, treasuryAddress],
      });
      console.log("RevenueSplitter verified!");
    } catch (error) {
      console.error("Error verifying RevenueSplitter:", error.message);
    }
  }

  // Verify CreatorRegistry
  if (CREATORREGISTRY_ADDRESS) {
    try {
      console.log("\nVerifying CreatorRegistry...");
      await hre.run("verify:verify", {
        address: CREATORREGISTRY_ADDRESS,
        constructorArguments: [],
      });
      console.log("CreatorRegistry verified!");
    } catch (error) {
      console.error("Error verifying CreatorRegistry:", error.message);
    }
  }

  console.log("\nVerification complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

