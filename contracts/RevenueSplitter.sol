// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title RevenueSplitter
 * @dev Manages revenue distribution between creators, platform, and treasury
 */
contract RevenueSplitter is Ownable, ReentrancyGuard {
    
    // Revenue split percentages (in basis points, 10000 = 100%)
    uint256 public creatorShare = 7000;  // 70%
    uint256 public platformShare = 2000; // 20%
    uint256 public treasuryShare = 1000; // 10%
    
    // Platform and treasury addresses
    address public platformAddress;
    address public treasuryAddress;
    
    // Mapping from creator address to accumulated earnings
    mapping(address => uint256) public creatorEarnings;
    
    // Mapping from creator address to withdrawn amount
    mapping(address => uint256) public withdrawnEarnings;
    
    // Total revenue collected
    uint256 public totalRevenue;
    
    // Platform and treasury accumulated earnings
    uint256 public platformEarnings;
    uint256 public treasuryEarnings;
    
    // Events
    event RevenueDistributed(
        address indexed creator,
        uint256 creatorAmount,
        uint256 platformAmount,
        uint256 treasuryAmount,
        uint256 totalAmount
    );
    
    event EarningsWithdrawn(
        address indexed creator,
        uint256 amount
    );
    
    event SharesUpdated(
        uint256 creatorShare,
        uint256 platformShare,
        uint256 treasuryShare
    );
    
    event PlatformAddressUpdated(address indexed newAddress);
    event TreasuryAddressUpdated(address indexed newAddress);

    constructor(address _platformAddress, address _treasuryAddress) Ownable(msg.sender) {
        require(_platformAddress != address(0), "Invalid platform address");
        require(_treasuryAddress != address(0), "Invalid treasury address");
        
        platformAddress = _platformAddress;
        treasuryAddress = _treasuryAddress;
    }

    /**
     * @dev Distribute revenue for a prompt usage
     * @param creator The creator of the prompt
     */
    function distributeRevenue(address creator) external payable nonReentrant {
        require(msg.value > 0, "No value sent");
        require(creator != address(0), "Invalid creator address");

        uint256 totalAmount = msg.value;
        
        uint256 creatorAmount = (totalAmount * creatorShare) / 10000;
        uint256 platformAmount = (totalAmount * platformShare) / 10000;
        uint256 treasuryAmount = totalAmount - creatorAmount - platformAmount;

        creatorEarnings[creator] += creatorAmount;
        platformEarnings += platformAmount;
        treasuryEarnings += treasuryAmount;
        
        totalRevenue += totalAmount;

        emit RevenueDistributed(
            creator,
            creatorAmount,
            platformAmount,
            treasuryAmount,
            totalAmount
        );
    }

    /**
     * @dev Withdraw accumulated earnings (Pull Payment pattern)
     */
    function withdrawEarnings() external nonReentrant {
        uint256 available = creatorEarnings[msg.sender] - withdrawnEarnings[msg.sender];
        require(available > 0, "No earnings available");

        withdrawnEarnings[msg.sender] += available;

        (bool success, ) = msg.sender.call{value: available}("");
        require(success, "Transfer failed");

        emit EarningsWithdrawn(msg.sender, available);
    }

    /**
     * @dev Withdraw platform earnings
     */
    function withdrawPlatformEarnings() external onlyOwner nonReentrant {
        require(platformEarnings > 0, "No platform earnings");
        
        uint256 amount = platformEarnings;
        platformEarnings = 0;

        (bool success, ) = platformAddress.call{value: amount}("");
        require(success, "Transfer failed");
    }

    /**
     * @dev Withdraw treasury earnings
     */
    function withdrawTreasuryEarnings() external onlyOwner nonReentrant {
        require(treasuryEarnings > 0, "No treasury earnings");
        
        uint256 amount = treasuryEarnings;
        treasuryEarnings = 0;

        (bool success, ) = treasuryAddress.call{value: amount}("");
        require(success, "Transfer failed");
    }

    /**
     * @dev Get available earnings for a creator
     * @param creator The creator address
     * @return Available amount
     */
    function getAvailableEarnings(address creator) external view returns (uint256) {
        return creatorEarnings[creator] - withdrawnEarnings[creator];
    }

    /**
     * @dev Update revenue share percentages
     * @param _creatorShare New creator share (in basis points)
     * @param _platformShare New platform share (in basis points)
     * @param _treasuryShare New treasury share (in basis points)
     */
    function updateShares(
        uint256 _creatorShare,
        uint256 _platformShare,
        uint256 _treasuryShare
    ) external onlyOwner {
        require(
            _creatorShare + _platformShare + _treasuryShare == 10000,
            "Shares must sum to 10000"
        );

        creatorShare = _creatorShare;
        platformShare = _platformShare;
        treasuryShare = _treasuryShare;

        emit SharesUpdated(_creatorShare, _platformShare, _treasuryShare);
    }

    /**
     * @dev Update platform address
     * @param newAddress New platform address
     */
    function updatePlatformAddress(address newAddress) external onlyOwner {
        require(newAddress != address(0), "Invalid address");
        platformAddress = newAddress;
        emit PlatformAddressUpdated(newAddress);
    }

    /**
     * @dev Update treasury address
     * @param newAddress New treasury address
     */
    function updateTreasuryAddress(address newAddress) external onlyOwner {
        require(newAddress != address(0), "Invalid address");
        treasuryAddress = newAddress;
        emit TreasuryAddressUpdated(newAddress);
    }

    /**
     * @dev Get contract balance
     * @return Current balance
     */
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}

