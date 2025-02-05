// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Events
 * @dev Central event definitions for PromptFi protocol
 */
contract Events {
    // Prompt Events
    event PromptCreated(uint256 indexed promptId, address indexed creator, string metadataURI);
    event PromptUpdated(uint256 indexed promptId, string newMetadataURI);
    event PromptDeleted(uint256 indexed promptId);
    
    // Usage Events
    event PromptAccessed(uint256 indexed promptId, address indexed user, uint256 fee);
    event UsageRecorded(uint256 indexed promptId, address indexed user, uint256 timestamp);
    
    // Revenue Events
    event RevenueReceived(address indexed from, uint256 amount);
    event RevenueDistributed(address indexed to, uint256 amount, string reason);
    event RoyaltyPaid(uint256 indexed promptId, address indexed creator, uint256 amount);
    
    // Creator Events
    event CreatorJoined(address indexed creator, string username);
    event CreatorVerified(address indexed creator);
    event CreatorBanned(address indexed creator, string reason);
    
    // Marketplace Events
    event ListingCreated(uint256 indexed listingId, uint256 indexed promptId, uint256 price);
    event ListingUpdated(uint256 indexed listingId, uint256 newPrice);
    event ListingCancelled(uint256 indexed listingId);
    event PurchaseCompleted(uint256 indexed listingId, address indexed buyer, uint256 amount);
}

