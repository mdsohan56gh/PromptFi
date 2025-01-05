const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Integration Tests", function () {
  let promptNFT, usageTracker, revenueSplitter, creatorRegistry;
  let owner, creator, user, platform, treasury;

  beforeEach(async function () {
    [owner, creator, user, platform, treasury] = await ethers.getSigners();

    // Deploy all contracts
    const PromptNFT = await ethers.getContractFactory("PromptNFT");
    promptNFT = await PromptNFT.deploy();

    const UsageTracker = await ethers.getContractFactory("UsageTracker");
    usageTracker = await UsageTracker.deploy();

    const RevenueSplitter = await ethers.getContractFactory("RevenueSplitter");
    revenueSplitter = await RevenueSplitter.deploy(platform.address, treasury.address);

    const CreatorRegistry = await ethers.getContractFactory("CreatorRegistry");
    creatorRegistry = await CreatorRegistry.deploy();
  });

  describe("End-to-End Flow", function () {
    it("Should handle complete prompt lifecycle", async function () {
      // 1. Register creator
      await creatorRegistry.connect(creator).registerCreator(
        "testcreator",
        "ipfs://QmProfile"
      );

      // 2. Mint prompt
      const promptHash = ethers.keccak256(ethers.toUtf8Bytes("Test prompt"));
      await promptNFT.connect(creator).mintPromptNFT(
        promptHash,
        "GPT-4",
        1000,
        "ipfs://QmPrompt"
      );

      // 3. Record usage
      await usageTracker.authorizeCaller(owner.address);
      await usageTracker.recordUsage(1, user.address, ethers.parseEther("0.01"), "session1");

      // 4. Distribute revenue
      await revenueSplitter.connect(user).distributeRevenue(creator.address, {
        value: ethers.parseEther("0.01")
      });

      // 5. Verify earnings
      const earnings = await revenueSplitter.getAvailableEarnings(creator.address);
      expect(earnings).to.equal(ethers.parseEther("0.007")); // 70%

      // 6. Withdraw earnings
      await revenueSplitter.connect(creator).withdrawEarnings();
      
      const finalEarnings = await revenueSplitter.getAvailableEarnings(creator.address);
      expect(finalEarnings).to.equal(0);
    });

    it("Should track multiple prompts and usages", async function () {
      await creatorRegistry.connect(creator).registerCreator("creator1", "ipfs://Q1");

      // Mint multiple prompts
      for (let i = 0; i < 3; i++) {
        const hash = ethers.keccak256(ethers.toUtf8Bytes(`Prompt ${i}`));
        await promptNFT.connect(creator).mintPromptNFT(
          hash,
          "GPT-4",
          1000,
          `ipfs://Qm${i}`
        );
      }

      expect(await promptNFT.getTotalPrompts()).to.equal(3);

      // Record usage for each prompt
      await usageTracker.authorizeCaller(owner.address);
      for (let i = 1; i <= 3; i++) {
        await usageTracker.recordUsage(i, user.address, ethers.parseEther("0.01"), `session${i}`);
      }

      expect(await usageTracker.getTotalUsageRecords()).to.equal(3);
    });
  });
});

