const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PromptMarketplace", function () {
  let marketplace;
  let owner;
  let seller;
  let buyer;

  beforeEach(async function () {
    [owner, seller, buyer] = await ethers.getSigners();

    const PromptMarketplace = await ethers.getContractFactory("PromptMarketplace");
    marketplace = await PromptMarketplace.deploy();
    await marketplace.waitForDeployment();
  });

  describe("Listing Creation", function () {
    it("Should create a new listing", async function () {
      const promptId = 1;
      const price = ethers.parseEther("0.1");
      const duration = 86400; // 1 day

      await expect(
        marketplace.connect(seller).createListing(promptId, price, duration)
      ).to.emit(marketplace, "ListingCreated");

      const listing = await marketplace.listings(1);
      expect(listing.promptId).to.equal(promptId);
      expect(listing.seller).to.equal(seller.address);
      expect(listing.price).to.equal(price);
      expect(listing.active).to.be.true;
    });

    it("Should reject invalid prompt ID", async function () {
      await expect(
        marketplace.connect(seller).createListing(0, ethers.parseEther("0.1"), 86400)
      ).to.be.revertedWith("Invalid prompt ID");
    });

    it("Should reject zero price", async function () {
      await expect(
        marketplace.connect(seller).createListing(1, 0, 86400)
      ).to.be.revertedWith("Invalid price");
    });
  });

  describe("Listing Cancellation", function () {
    let listingId;

    beforeEach(async function () {
      const tx = await marketplace.connect(seller).createListing(
        1,
        ethers.parseEther("0.1"),
        86400
      );
      listingId = 1;
    });

    it("Should allow seller to cancel listing", async function () {
      await expect(
        marketplace.connect(seller).cancelListing(listingId)
      ).to.emit(marketplace, "ListingCancelled");

      const listing = await marketplace.listings(listingId);
      expect(listing.active).to.be.false;
    });

    it("Should not allow non-seller to cancel", async function () {
      await expect(
        marketplace.connect(buyer).cancelListing(listingId)
      ).to.be.revertedWith("Not the seller");
    });
  });

  describe("Purchase Access", function () {
    let listingId;
    const price = ethers.parseEther("0.1");

    beforeEach(async function () {
      await marketplace.connect(seller).createListing(1, price, 86400);
      listingId = 1;
    });

    it("Should allow purchase with correct payment", async function () {
      await expect(
        marketplace.connect(buyer).purchaseAccess(listingId, { value: price })
      ).to.emit(marketplace, "PurchaseMade");

      const hasAccess = await marketplace.hasActiveAccess(buyer.address, 1);
      expect(hasAccess).to.be.true;
    });

    it("Should reject insufficient payment", async function () {
      await expect(
        marketplace.connect(buyer).purchaseAccess(listingId, { 
          value: ethers.parseEther("0.05") 
        })
      ).to.be.revertedWith("Insufficient payment");
    });

    it("Should refund excess payment", async function () {
      const initialBalance = await ethers.provider.getBalance(buyer.address);
      const tx = await marketplace.connect(buyer).purchaseAccess(listingId, { 
        value: ethers.parseEther("0.15") 
      });
      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed * receipt.gasPrice;
      
      const finalBalance = await ethers.provider.getBalance(buyer.address);
      const expectedBalance = initialBalance - price - gasUsed;
      
      expect(finalBalance).to.be.closeTo(expectedBalance, ethers.parseEther("0.001"));
    });

    it("Should split payment correctly", async function () {
      const initialSellerBalance = await ethers.provider.getBalance(seller.address);
      
      await marketplace.connect(buyer).purchaseAccess(listingId, { value: price });
      
      const finalSellerBalance = await ethers.provider.getBalance(seller.address);
      const platformFee = await marketplace.platformFee();
      const expectedSellerAmount = price - (price * platformFee / 10000n);
      
      expect(finalSellerBalance).to.equal(initialSellerBalance + expectedSellerAmount);
    });
  });

  describe("Access Verification", function () {
    beforeEach(async function () {
      await marketplace.connect(seller).createListing(
        1,
        ethers.parseEther("0.1"),
        86400
      );
      await marketplace.connect(buyer).purchaseAccess(1, { 
        value: ethers.parseEther("0.1") 
      });
    });

    it("Should verify active access", async function () {
      const hasAccess = await marketplace.hasActiveAccess(buyer.address, 1);
      expect(hasAccess).to.be.true;
    });

    it("Should return false for non-existent access", async function () {
      const hasAccess = await marketplace.hasActiveAccess(seller.address, 1);
      expect(hasAccess).to.be.false;
    });
  });

  describe("Platform Fee", function () {
    it("Should allow owner to update fee", async function () {
      await marketplace.updatePlatformFee(500);
      expect(await marketplace.platformFee()).to.equal(500);
    });

    it("Should reject fee above maximum", async function () {
      await expect(
        marketplace.updatePlatformFee(1500)
      ).to.be.revertedWith("Fee too high");
    });

    it("Should not allow non-owner to update fee", async function () {
      await expect(
        marketplace.connect(seller).updatePlatformFee(500)
      ).to.be.reverted;
    });
  });
});

