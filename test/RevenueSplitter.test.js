const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RevenueSplitter", function () {
  let revenueSplitter;
  let owner;
  let platform;
  let treasury;
  let creator;
  let user;

  beforeEach(async function () {
    [owner, platform, treasury, creator, user] = await ethers.getSigners();

    const RevenueSplitter = await ethers.getContractFactory("RevenueSplitter");
    revenueSplitter = await RevenueSplitter.deploy(
      platform.address,
      treasury.address
    );
    await revenueSplitter.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the correct platform address", async function () {
      expect(await revenueSplitter.platformAddress()).to.equal(platform.address);
    });

    it("Should set the correct treasury address", async function () {
      expect(await revenueSplitter.treasuryAddress()).to.equal(treasury.address);
    });

    it("Should set default revenue shares correctly", async function () {
      expect(await revenueSplitter.creatorShare()).to.equal(7000);
      expect(await revenueSplitter.platformShare()).to.equal(2000);
      expect(await revenueSplitter.treasuryShare()).to.equal(1000);
    });
  });

  describe("Revenue Distribution", function () {
    it("Should distribute revenue correctly", async function () {
      const amount = ethers.parseEther("1.0");
      
      await expect(
        revenueSplitter.connect(user).distributeRevenue(creator.address, { value: amount })
      ).to.emit(revenueSplitter, "RevenueDistributed");

      const creatorEarnings = await revenueSplitter.creatorEarnings(creator.address);
      const platformEarnings = await revenueSplitter.platformEarnings();
      const treasuryEarnings = await revenueSplitter.treasuryEarnings();

      expect(creatorEarnings).to.equal(ethers.parseEther("0.7"));
      expect(platformEarnings).to.equal(ethers.parseEther("0.2"));
      expect(treasuryEarnings).to.equal(ethers.parseEther("0.1"));
    });

    it("Should accumulate earnings for multiple distributions", async function () {
      const amount = ethers.parseEther("1.0");
      
      await revenueSplitter.connect(user).distributeRevenue(creator.address, { value: amount });
      await revenueSplitter.connect(user).distributeRevenue(creator.address, { value: amount });

      const creatorEarnings = await revenueSplitter.creatorEarnings(creator.address);
      expect(creatorEarnings).to.equal(ethers.parseEther("1.4"));
    });

    it("Should reject zero value transfers", async function () {
      await expect(
        revenueSplitter.distributeRevenue(creator.address, { value: 0 })
      ).to.be.revertedWith("No value sent");
    });

    it("Should reject invalid creator address", async function () {
      await expect(
        revenueSplitter.distributeRevenue(ethers.ZeroAddress, { 
          value: ethers.parseEther("1.0") 
        })
      ).to.be.revertedWith("Invalid creator address");
    });
  });

  describe("Withdrawals", function () {
    beforeEach(async function () {
      const amount = ethers.parseEther("1.0");
      await revenueSplitter.connect(user).distributeRevenue(creator.address, { value: amount });
    });

    it("Should allow creator to withdraw earnings", async function () {
      const initialBalance = await ethers.provider.getBalance(creator.address);
      
      const tx = await revenueSplitter.connect(creator).withdrawEarnings();
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed * receipt.gasPrice;
      
      const finalBalance = await ethers.provider.getBalance(creator.address);
      const expectedBalance = initialBalance + ethers.parseEther("0.7") - gasUsed;
      
      expect(finalBalance).to.be.closeTo(expectedBalance, ethers.parseEther("0.001"));
    });

    it("Should emit EarningsWithdrawn event", async function () {
      await expect(
        revenueSplitter.connect(creator).withdrawEarnings()
      ).to.emit(revenueSplitter, "EarningsWithdrawn")
        .withArgs(creator.address, ethers.parseEther("0.7"));
    });

    it("Should not allow withdrawal with no earnings", async function () {
      await expect(
        revenueSplitter.connect(user).withdrawEarnings()
      ).to.be.revertedWith("No earnings available");
    });

    it("Should not allow double withdrawal", async function () {
      await revenueSplitter.connect(creator).withdrawEarnings();
      
      await expect(
        revenueSplitter.connect(creator).withdrawEarnings()
      ).to.be.revertedWith("No earnings available");
    });
  });

  describe("Share Updates", function () {
    it("Should allow owner to update shares", async function () {
      await expect(
        revenueSplitter.updateShares(6000, 3000, 1000)
      ).to.emit(revenueSplitter, "SharesUpdated")
        .withArgs(6000, 3000, 1000);

      expect(await revenueSplitter.creatorShare()).to.equal(6000);
      expect(await revenueSplitter.platformShare()).to.equal(3000);
      expect(await revenueSplitter.treasuryShare()).to.equal(1000);
    });

    it("Should reject shares that don't sum to 10000", async function () {
      await expect(
        revenueSplitter.updateShares(6000, 3000, 2000)
      ).to.be.revertedWith("Shares must sum to 10000");
    });

    it("Should not allow non-owner to update shares", async function () {
      await expect(
        revenueSplitter.connect(user).updateShares(6000, 3000, 1000)
      ).to.be.reverted;
    });
  });

  describe("Platform and Treasury Withdrawals", function () {
    beforeEach(async function () {
      const amount = ethers.parseEther("1.0");
      await revenueSplitter.connect(user).distributeRevenue(creator.address, { value: amount });
    });

    it("Should allow owner to withdraw platform earnings", async function () {
      const initialBalance = await ethers.provider.getBalance(platform.address);
      
      await revenueSplitter.withdrawPlatformEarnings();
      
      const finalBalance = await ethers.provider.getBalance(platform.address);
      expect(finalBalance).to.equal(initialBalance + ethers.parseEther("0.2"));
    });

    it("Should allow owner to withdraw treasury earnings", async function () {
      const initialBalance = await ethers.provider.getBalance(treasury.address);
      
      await revenueSplitter.withdrawTreasuryEarnings();
      
      const finalBalance = await ethers.provider.getBalance(treasury.address);
      expect(finalBalance).to.equal(initialBalance + ethers.parseEther("0.1"));
    });

    it("Should not allow non-owner to withdraw platform earnings", async function () {
      await expect(
        revenueSplitter.connect(user).withdrawPlatformEarnings()
      ).to.be.reverted;
    });
  });
});

