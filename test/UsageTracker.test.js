const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UsageTracker", function () {
  let usageTracker;
  let owner;
  let caller1;
  let caller2;
  let unauthorized;

  beforeEach(async function () {
    [owner, caller1, caller2, unauthorized] = await ethers.getSigners();

    const UsageTracker = await ethers.getContractFactory("UsageTracker");
    usageTracker = await UsageTracker.deploy();
    await usageTracker.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await usageTracker.owner()).to.equal(owner.address);
    });

    it("Should authorize owner by default", async function () {
      expect(await usageTracker.authorizedCallers(owner.address)).to.be.true;
    });
  });

  describe("Authorization", function () {
    it("Should allow owner to authorize callers", async function () {
      await expect(usageTracker.authorizeCaller(caller1.address))
        .to.emit(usageTracker, "CallerAuthorized")
        .withArgs(caller1.address);

      expect(await usageTracker.authorizedCallers(caller1.address)).to.be.true;
    });

    it("Should allow owner to revoke authorization", async function () {
      await usageTracker.authorizeCaller(caller1.address);
      
      await expect(usageTracker.revokeCaller(caller1.address))
        .to.emit(usageTracker, "CallerRevoked")
        .withArgs(caller1.address);

      expect(await usageTracker.authorizedCallers(caller1.address)).to.be.false;
    });

    it("Should not allow non-owner to authorize", async function () {
      await expect(
        usageTracker.connect(caller1).authorizeCaller(caller2.address)
      ).to.be.reverted;
    });
  });

  describe("Recording Usage", function () {
    beforeEach(async function () {
      await usageTracker.authorizeCaller(caller1.address);
    });

    it("Should record usage correctly", async function () {
      const promptId = 1;
      const caller = caller2.address;
      const fee = ethers.parseEther("0.01");
      const sessionId = "session123";

      await expect(
        usageTracker.connect(caller1).recordUsage(promptId, caller, fee, sessionId)
      )
        .to.emit(usageTracker, "UsageRecorded")
        .withArgs(promptId, caller, fee, await ethers.provider.getBlock('latest').then(b => b.timestamp + 1), sessionId);

      expect(await usageTracker.getPromptUsageCount(promptId)).to.equal(1);
      expect(await usageTracker.getCallerTotalCalls(caller)).to.equal(1);
    });

    it("Should track multiple usage records", async function () {
      const promptId1 = 1;
      const promptId2 = 2;
      const caller = caller2.address;
      const fee = ethers.parseEther("0.01");

      await usageTracker.connect(caller1).recordUsage(promptId1, caller, fee, "session1");
      await usageTracker.connect(caller1).recordUsage(promptId1, caller, fee, "session2");
      await usageTracker.connect(caller1).recordUsage(promptId2, caller, fee, "session3");

      expect(await usageTracker.getPromptUsageCount(promptId1)).to.equal(2);
      expect(await usageTracker.getPromptUsageCount(promptId2)).to.equal(1);
      expect(await usageTracker.getCallerTotalCalls(caller)).to.equal(3);
      expect(await usageTracker.getTotalUsageRecords()).to.equal(3);
    });

    it("Should not allow unauthorized callers", async function () {
      const promptId = 1;
      const caller = caller2.address;
      const fee = ethers.parseEther("0.01");

      await expect(
        usageTracker.connect(unauthorized).recordUsage(promptId, caller, fee, "session1")
      ).to.be.revertedWith("Caller not authorized");
    });

    it("Should reject invalid prompt ID", async function () {
      await expect(
        usageTracker.connect(caller1).recordUsage(0, caller2.address, 100, "session1")
      ).to.be.revertedWith("Invalid prompt ID");
    });

    it("Should reject invalid caller address", async function () {
      await expect(
        usageTracker.connect(caller1).recordUsage(1, ethers.ZeroAddress, 100, "session1")
      ).to.be.revertedWith("Invalid caller address");
    });
  });

  describe("Usage Records Retrieval", function () {
    beforeEach(async function () {
      await usageTracker.authorizeCaller(caller1.address);
      
      // Record some usage
      for (let i = 0; i < 5; i++) {
        await usageTracker.connect(caller1).recordUsage(
          1,
          caller2.address,
          ethers.parseEther("0.01"),
          `session${i}`
        );
      }
    });

    it("Should retrieve usage records with pagination", async function () {
      const records = await usageTracker.getPromptUsageRecords(1, 0, 3);
      expect(records.length).to.equal(3);
    });

    it("Should handle offset beyond array length", async function () {
      const records = await usageTracker.getPromptUsageRecords(1, 10, 5);
      expect(records.length).to.equal(0);
    });

    it("Should adjust limit if exceeds array length", async function () {
      const records = await usageTracker.getPromptUsageRecords(1, 3, 10);
      expect(records.length).to.equal(2);
    });
  });
});

