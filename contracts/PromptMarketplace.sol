// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title PromptMarketplace
 * @dev Marketplace for buying and selling prompt access
 */
contract PromptMarketplace is Ownable, ReentrancyGuard {
    
    struct Listing {
        uint256 promptId;
        address seller;
        uint256 price;
        uint256 duration; // Access duration in seconds
        bool active;
        uint256 createdAt;
    }

    struct Purchase {
        uint256 listingId;
        address buyer;
        uint256 expiresAt;
        uint256 purchasedAt;
    }

    // Listing ID counter
    uint256 private _listingIdCounter;
    
    // Purchase ID counter
    uint256 private _purchaseIdCounter;
    
    // Mapping from listing ID to listing
    mapping(uint256 => Listing) public listings;
    
    // Mapping from purchase ID to purchase
    mapping(uint256 => Purchase) public purchases;
    
    // Mapping from buyer to their purchase IDs
    mapping(address => uint256[]) public buyerPurchases;
    
    // Mapping from prompt ID to listing IDs
    mapping(uint256 => uint256[]) public promptListings;
    
    // Platform fee (in basis points, 10000 = 100%)
    uint256 public platformFee = 250; // 2.5%

    // Events
    event ListingCreated(
        uint256 indexed listingId,
        uint256 indexed promptId,
        address indexed seller,
        uint256 price,
        uint256 duration
    );
    
    event ListingCancelled(
        uint256 indexed listingId
    );
    
    event PurchaseMade(
        uint256 indexed purchaseId,
        uint256 indexed listingId,
        address indexed buyer,
        uint256 price,
        uint256 expiresAt
    );

    constructor() Ownable(msg.sender) {
        _listingIdCounter = 1;
        _purchaseIdCounter = 1;
    }

    /**
     * @dev Create a new listing
     * @param promptId The prompt ID
     * @param price Price in wei
     * @param duration Access duration in seconds
     */
    function createListing(
        uint256 promptId,
        uint256 price,
        uint256 duration
    ) external nonReentrant returns (uint256) {
        require(promptId > 0, "Invalid prompt ID");
        require(price > 0, "Invalid price");
        require(duration > 0, "Invalid duration");

        uint256 listingId = _listingIdCounter++;

        listings[listingId] = Listing({
            promptId: promptId,
            seller: msg.sender,
            price: price,
            duration: duration,
            active: true,
            createdAt: block.timestamp
        });

        promptListings[promptId].push(listingId);

        emit ListingCreated(listingId, promptId, msg.sender, price, duration);

        return listingId;
    }

    /**
     * @dev Cancel a listing
     * @param listingId The listing ID
     */
    function cancelListing(uint256 listingId) external {
        Listing storage listing = listings[listingId];
        require(listing.seller == msg.sender, "Not the seller");
        require(listing.active, "Listing not active");

        listing.active = false;

        emit ListingCancelled(listingId);
    }

    /**
     * @dev Purchase access to a prompt
     * @param listingId The listing ID
     */
    function purchaseAccess(uint256 listingId) external payable nonReentrant returns (uint256) {
        Listing storage listing = listings[listingId];
        require(listing.active, "Listing not active");
        require(msg.value >= listing.price, "Insufficient payment");

        uint256 platformAmount = (listing.price * platformFee) / 10000;
        uint256 sellerAmount = listing.price - platformAmount;

        // Transfer funds
        (bool successSeller, ) = listing.seller.call{value: sellerAmount}("");
        require(successSeller, "Seller transfer failed");

        if (platformAmount > 0) {
            (bool successPlatform, ) = owner().call{value: platformAmount}("");
            require(successPlatform, "Platform transfer failed");
        }

        // Refund excess payment
        if (msg.value > listing.price) {
            (bool successRefund, ) = msg.sender.call{value: msg.value - listing.price}("");
            require(successRefund, "Refund failed");
        }

        // Create purchase record
        uint256 purchaseId = _purchaseIdCounter++;
        uint256 expiresAt = block.timestamp + listing.duration;

        purchases[purchaseId] = Purchase({
            listingId: listingId,
            buyer: msg.sender,
            expiresAt: expiresAt,
            purchasedAt: block.timestamp
        });

        buyerPurchases[msg.sender].push(purchaseId);

        emit PurchaseMade(purchaseId, listingId, msg.sender, listing.price, expiresAt);

        return purchaseId;
    }

    /**
     * @dev Check if buyer has active access
     * @param buyer Buyer address
     * @param promptId Prompt ID
     * @return True if buyer has active access
     */
    function hasActiveAccess(address buyer, uint256 promptId) external view returns (bool) {
        uint256[] memory userPurchases = buyerPurchases[buyer];
        
        for (uint256 i = 0; i < userPurchases.length; i++) {
            Purchase memory purchase = purchases[userPurchases[i]];
            Listing memory listing = listings[purchase.listingId];
            
            if (listing.promptId == promptId && purchase.expiresAt > block.timestamp) {
                return true;
            }
        }
        
        return false;
    }

    /**
     * @dev Get listings for a prompt
     * @param promptId The prompt ID
     * @return Array of listing IDs
     */
    function getPromptListings(uint256 promptId) external view returns (uint256[] memory) {
        return promptListings[promptId];
    }

    /**
     * @dev Get buyer purchases
     * @param buyer Buyer address
     * @return Array of purchase IDs
     */
    function getBuyerPurchases(address buyer) external view returns (uint256[] memory) {
        return buyerPurchases[buyer];
    }

    /**
     * @dev Update platform fee
     * @param newFee New fee in basis points
     */
    function updatePlatformFee(uint256 newFee) external onlyOwner {
        require(newFee <= 1000, "Fee too high"); // Max 10%
        platformFee = newFee;
    }
}

