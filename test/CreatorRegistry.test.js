const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CreatorRegistry", function () {
  let creatorRegistry;
  let owner;
  let creator1;
  let creator2;

  beforeEach(async function () {
    [owner, creator1, creator2] = await ethers.getSigners();

    const CreatorRegistry = await ethers.getContractFactory("CreatorRegistry");
    creatorRegistry = await CreatorRegistry.deploy();
    await creatorRegistry.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await creatorRegistry.owner()).to.equal(owner.address);
    });

    it("Should authorize owner as updater", async function () {
      expect(await creatorRegistry.authorizedUpdaters(owner.address)).to.be.true;
    });
  });

  describe("Creator Registration", function () {
    it("Should register a new creator", async function () {
      const username = "testuser";
      const profileURI = "ipfs://QmTest123";

      await expect(
        creatorRegistry.connect(creator1).registerCreator(username, profileURI)
      ).to.emit(creatorRegistry, "CreatorRegistered")
        .withArgs(creator1.address, username, await ethers.provider.getBlock('latest').then(b => b.timestamp + 1));

      expect(await creatorRegistry.isCreatorRegistered(creator1.address)).to.be.true;
      expect(await creatorRegistry.getTotalCreators()).to.equal(1);
    });

    it("Should store correct profile data", async function () {
      const username = "testuser";
      const profileURI = "ipfs://QmTest123";

      await creatorRegistry.connect(creator1).registerCreator(username, profileURI);

      const profile = await creatorRegistry.getCreatorProfile(creator1.address);
      expect(profile.creatorAddress).to.equal(creator1.address);
      expect(profile.username).to.equal(username);
      expect(profile.profileURI).to.equal(profileURI);
      expect(profile.totalPrompts).to.equal(0);
      expect(profile.totalUsage).to.equal(0);
      expect(profile.reputationScore).to.equal(100);
      expect(profile.isVerified).to.be.false;
      expect(profile.exists).to.be.true;
    });

    it("Should not allow duplicate registration", async function () {
      await creatorRegistry.connect(creator1).registerCreator("testuser", "ipfs://QmTest123");

      await expect(
        creatorRegistry.connect(creator1).registerCreator("testuser2", "ipfs://QmTest456")
      ).to.be.revertedWith("Creator already registered");
    });

    it("Should not allow duplicate usernames", async function () {
      await creatorRegistry.connect(creator1).registerCreator("testuser", "ipfs://QmTest123");

      await expect(
        creatorRegistry.connect(creator2).registerCreator("testuser", "ipfs://QmTest456")
      ).to.be.revertedWith("Username taken");
    });

    it("Should reject empty username", async function () {
      await expect(
        creatorRegistry.connect(creator1).registerCreator("", "ipfs://QmTest123")
      ).to.be.revertedWith("Username cannot be empty");
    });
  });

  describe("Profile Updates", function () {
    beforeEach(async function () {
      await creatorRegistry.connect(creator1).registerCreator("testuser", "ipfs://QmTest123");
    });

    it("Should allow creator to update profile", async function () {
      const newProfileURI = "ipfs://QmTest456";

      await expect(
        creatorRegistry.connect(creator1).updateProfile(newProfileURI)
      ).to.emit(creatorRegistry, "ProfileUpdated")
        .withArgs(creator1.address, newProfileURI);

      const profile = await creatorRegistry.getCreatorProfile(creator1.address);
      expect(profile.profileURI).to.equal(newProfileURI);
    });

    it("Should not allow non-registered to update profile", async function () {
      await expect(
        creatorRegistry.connect(creator2).updateProfile("ipfs://QmTest456")
      ).to.be.revertedWith("Creator not registered");
    });
  });

  describe("Stats Updates", function () {
    beforeEach(async function () {
      await creatorRegistry.connect(creator1).registerCreator("testuser", "ipfs://QmTest123");
      await creatorRegistry.authorizeUpdater(owner.address);
    });

    it("Should increment prompts count", async function () {
      await creatorRegistry.incrementPrompts(creator1.address);
      
      const profile = await creatorRegistry.getCreatorProfile(creator1.address);
      expect(profile.totalPrompts).to.equal(1);
    });

    it("Should increment usage count", async function () {
      await creatorRegistry.incrementUsage(creator1.address);
      await creatorRegistry.incrementUsage(creator1.address);
      
      const profile = await creatorRegistry.getCreatorProfile(creator1.address);
      expect(profile.totalUsage).to.equal(2);
    });

    it("Should add earnings", async function () {
      const earnings = ethers.parseEther("1.5");
      await creatorRegistry.addEarnings(creator1.address, earnings);
      
      const profile = await creatorRegistry.getCreatorProfile(creator1.address);
      expect(profile.totalEarnings).to.equal(earnings);
    });

    it("Should update reputation score", async function () {
      const newScore = 150;
      
      await expect(
        creatorRegistry.updateReputation(creator1.address, newScore)
      ).to.emit(creatorRegistry, "ReputationUpdated")
        .withArgs(creator1.address, newScore);

      const profile = await creatorRegistry.getCreatorProfile(creator1.address);
      expect(profile.reputationScore).to.equal(newScore);
    });

    it("Should not allow unauthorized updaters", async function () {
      await expect(
        creatorRegistry.connect(creator2).incrementPrompts(creator1.address)
      ).to.be.revertedWith("Not authorized");
    });
  });

  describe("Creator Verification", function () {
    beforeEach(async function () {
      await creatorRegistry.connect(creator1).registerCreator("testuser", "ipfs://QmTest123");
    });

    it("Should allow owner to verify creator", async function () {
      await expect(
        creatorRegistry.verifyCreator(creator1.address)
      ).to.emit(creatorRegistry, "CreatorVerified")
        .withArgs(creator1.address);

      const profile = await creatorRegistry.getCreatorProfile(creator1.address);
      expect(profile.isVerified).to.be.true;
    });

    it("Should not allow non-owner to verify", async function () {
      await expect(
        creatorRegistry.connect(creator2).verifyCreator(creator1.address)
      ).to.be.reverted;
    });
  });

  describe("Authorization Management", function () {
    it("Should allow owner to authorize updaters", async function () {
      await creatorRegistry.authorizeUpdater(creator1.address);
      expect(await creatorRegistry.authorizedUpdaters(creator1.address)).to.be.true;
    });

    it("Should allow owner to revoke updaters", async function () {
      await creatorRegistry.authorizeUpdater(creator1.address);
      await creatorRegistry.revokeUpdater(creator1.address);
      expect(await creatorRegistry.authorizedUpdaters(creator1.address)).to.be.false;
    });

    it("Should not allow non-owner to manage authorization", async function () {
      await expect(
        creatorRegistry.connect(creator1).authorizeUpdater(creator2.address)
      ).to.be.reverted;
    });
  });
});

