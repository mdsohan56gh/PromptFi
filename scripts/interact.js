const hre = require("hardhat");

/**
 * Script to interact with deployed contracts
 */
async function main() {
  const [signer] = await hre.ethers.getSigners();
  console.log("Interacting with contracts using account:", signer.address);

  // Contract addresses (replace with your deployed addresses)
  const PROMPTNFT_ADDRESS = process.env.PROMPTNFT_ADDRESS || "";
  const CREATORREGISTRY_ADDRESS = process.env.CREATORREGISTRY_ADDRESS || "";

  if (!PROMPTNFT_ADDRESS || !CREATORREGISTRY_ADDRESS) {
    console.error("Please set contract addresses in environment variables");
    process.exit(1);
  }

  // Get contract instances
  const PromptNFT = await hre.ethers.getContractFactory("PromptNFT");
  const promptNFT = PromptNFT.attach(PROMPTNFT_ADDRESS);

  const CreatorRegistry = await hre.ethers.getContractFactory("CreatorRegistry");
  const creatorRegistry = CreatorRegistry.attach(CREATORREGISTRY_ADDRESS);

  console.log("\n=== Contract Interaction Examples ===\n");

  // Example 1: Register as a creator
  console.log("1. Registering creator...");
  try {
    const registerTx = await creatorRegistry.registerCreator(
      "testcreator",
      "ipfs://QmTestProfile123"
    );
    await registerTx.wait();
    console.log("✓ Creator registered");
  } catch (error) {
    console.log("Creator may already be registered");
  }

  // Example 2: Mint a prompt
  console.log("\n2. Minting a prompt NFT...");
  const promptContent = "Generate a comprehensive blog post about Web3 technology";
  const promptHash = hre.ethers.keccak256(hre.ethers.toUtf8Bytes(promptContent));
  const modelType = "GPT-4";
  const royaltyRatio = 1000; // 10%
  const metadataURI = "ipfs://QmTestPrompt123";

  try {
    const mintTx = await promptNFT.mintPromptNFT(
      promptHash,
      modelType,
      royaltyRatio,
      metadataURI
    );
    const receipt = await mintTx.wait();
    console.log("✓ Prompt minted, tx hash:", receipt.hash);
  } catch (error) {
    console.log("Error minting prompt:", error.message);
  }

  // Example 3: Get total prompts
  console.log("\n3. Fetching total prompts...");
  const totalPrompts = await promptNFT.getTotalPrompts();
  console.log("Total prompts:", totalPrompts.toString());

  // Example 4: Get prompt metadata
  if (totalPrompts > 0) {
    console.log("\n4. Fetching prompt metadata for token ID 1...");
    const metadata = await promptNFT.getPromptMetadata(1);
    console.log("Creator:", metadata.creator);
    console.log("Model Type:", metadata.modelType);
    console.log("Usage Count:", metadata.usageCount.toString());
  }

  // Example 5: Get creator profile
  console.log("\n5. Fetching creator profile...");
  try {
    const profile = await creatorRegistry.getCreatorProfile(signer.address);
    console.log("Username:", profile.username);
    console.log("Total Prompts:", profile.totalPrompts.toString());
    console.log("Reputation:", profile.reputationScore.toString());
  } catch (error) {
    console.log("Error fetching profile:", error.message);
  }

  console.log("\n=== Interaction Complete ===\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

