const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PromptNFT", function () {
  let promptNFT;
  let owner;
  let creator;
  let user;

  beforeEach(async function () {
    [owner, creator, user] = await ethers.getSigners();

    const PromptNFT = await ethers.getContractFactory("PromptNFT");
    promptNFT = await PromptNFT.deploy();
    await promptNFT.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await promptNFT.owner()).to.equal(owner.address);
    });

    it("Should start with token counter at 1", async function () {
      expect(await promptNFT.getTotalPrompts()).to.equal(0);
    });
  });

  describe("Minting", function () {
    it("Should mint a new prompt NFT", async function () {
      const promptHash = ethers.keccak256(ethers.toUtf8Bytes("Test prompt"));
      const modelType = "GPT-4";
      const royaltyRatio = 1000; // 10%
      const metadataURI = "ipfs://QmTest123";

      await expect(
        promptNFT.connect(creator).mintPromptNFT(
          promptHash,
          modelType,
          royaltyRatio,
          metadataURI
        )
      ).to.emit(promptNFT, "PromptMinted");

      expect(await promptNFT.getTotalPrompts()).to.equal(1);
    });

    it("Should not allow duplicate prompt hash", async function () {
      const promptHash = ethers.keccak256(ethers.toUtf8Bytes("Test prompt"));
      const modelType = "GPT-4";
      const royaltyRatio = 1000;
      const metadataURI = "ipfs://QmTest123";

      await promptNFT.connect(creator).mintPromptNFT(
        promptHash,
        modelType,
        royaltyRatio,
        metadataURI
      );

      await expect(
        promptNFT.connect(user).mintPromptNFT(
          promptHash,
          modelType,
          royaltyRatio,
          metadataURI
        )
      ).to.be.revertedWith("Prompt already exists");
    });

    it("Should reject invalid royalty ratio", async function () {
      const promptHash = ethers.keccak256(ethers.toUtf8Bytes("Test prompt"));
      const modelType = "GPT-4";
      const royaltyRatio = 15000; // 150%, invalid
      const metadataURI = "ipfs://QmTest123";

      await expect(
        promptNFT.connect(creator).mintPromptNFT(
          promptHash,
          modelType,
          royaltyRatio,
          metadataURI
        )
      ).to.be.revertedWith("Invalid royalty ratio");
    });

    it("Should reject empty metadata URI", async function () {
      const promptHash = ethers.keccak256(ethers.toUtf8Bytes("Test prompt"));
      const modelType = "GPT-4";
      const royaltyRatio = 1000;
      const metadataURI = "";

      await expect(
        promptNFT.connect(creator).mintPromptNFT(
          promptHash,
          modelType,
          royaltyRatio,
          metadataURI
        )
      ).to.be.revertedWith("Empty metadata URI");
    });
  });

  describe("Usage Recording", function () {
    let tokenId;

    beforeEach(async function () {
      const promptHash = ethers.keccak256(ethers.toUtf8Bytes("Test prompt"));
      const modelType = "GPT-4";
      const royaltyRatio = 1000;
      const metadataURI = "ipfs://QmTest123";

      const tx = await promptNFT.connect(creator).mintPromptNFT(
        promptHash,
        modelType,
        royaltyRatio,
        metadataURI
      );
      
      const receipt = await tx.wait();
      tokenId = 1;
    });

    it("Should record usage correctly", async function () {
      await expect(promptNFT.connect(user).recordUsage(tokenId))
        .to.emit(promptNFT, "PromptUsed")
        .withArgs(tokenId, user.address, await ethers.provider.getBlock('latest').then(b => b.timestamp + 1));

      const metadata = await promptNFT.getPromptMetadata(tokenId);
      expect(metadata.usageCount).to.equal(1);
    });

    it("Should increment usage count on multiple calls", async function () {
      await promptNFT.connect(user).recordUsage(tokenId);
      await promptNFT.connect(user).recordUsage(tokenId);
      await promptNFT.connect(user).recordUsage(tokenId);

      const metadata = await promptNFT.getPromptMetadata(tokenId);
      expect(metadata.usageCount).to.equal(3);
    });

    it("Should revert for non-existent token", async function () {
      await expect(
        promptNFT.connect(user).recordUsage(999)
      ).to.be.revertedWith("Prompt does not exist");
    });
  });

  describe("Metadata", function () {
    it("Should return correct metadata", async function () {
      const promptHash = ethers.keccak256(ethers.toUtf8Bytes("Test prompt"));
      const modelType = "GPT-4";
      const royaltyRatio = 1000;
      const metadataURI = "ipfs://QmTest123";

      await promptNFT.connect(creator).mintPromptNFT(
        promptHash,
        modelType,
        royaltyRatio,
        metadataURI
      );

      const metadata = await promptNFT.getPromptMetadata(1);
      expect(metadata.promptHash).to.equal(promptHash);
      expect(metadata.modelType).to.equal(modelType);
      expect(metadata.creator).to.equal(creator.address);
      expect(metadata.royaltyRatio).to.equal(royaltyRatio);
      expect(metadata.metadataURI).to.equal(metadataURI);
      expect(metadata.usageCount).to.equal(0);
      expect(metadata.exists).to.be.true;
    });

    it("Should return correct URI", async function () {
      const promptHash = ethers.keccak256(ethers.toUtf8Bytes("Test prompt"));
      const modelType = "GPT-4";
      const royaltyRatio = 1000;
      const metadataURI = "ipfs://QmTest123";

      await promptNFT.connect(creator).mintPromptNFT(
        promptHash,
        modelType,
        royaltyRatio,
        metadataURI
      );

      expect(await promptNFT.uri(1)).to.equal(metadataURI);
    });
  });
});

