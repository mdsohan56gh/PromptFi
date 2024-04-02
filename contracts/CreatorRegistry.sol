// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CreatorRegistry
 * @dev Manages creator profiles and reputation system
 */
contract CreatorRegistry is Ownable {
    
    struct CreatorProfile {
        address creatorAddress;
        string username;
        string profileURI;
        uint256 totalPrompts;
        uint256 totalUsage;
        uint256 totalEarnings;
        uint256 reputationScore;
        uint256 joinedAt;
        bool isVerified;
        bool exists;
    }

    // Mapping from address to creator profile
    mapping(address => CreatorProfile) public creators;
    
    // Mapping from username to address
    mapping(string => address) public usernameToAddress;
    
    // Array of all creator addresses
    address[] public creatorAddresses;
    
    // Authorized updaters (contracts that can update stats)
    mapping(address => bool) public authorizedUpdaters;

    // Events
    event CreatorRegistered(
        address indexed creator,
        string username,
        uint256 timestamp
    );
    
    event ProfileUpdated(
        address indexed creator,
        string profileURI
    );
    
    event CreatorVerified(
        address indexed creator
    );
    
    event ReputationUpdated(
        address indexed creator,
        uint256 newScore
    );

    constructor() Ownable(msg.sender) {
        authorizedUpdaters[msg.sender] = true;
    }

    modifier onlyAuthorized() {
        require(authorizedUpdaters[msg.sender], "Not authorized");
        _;
    }

    /**
     * @dev Register a new creator
     * @param username Unique username
     * @param profileURI IPFS/Arweave URI for profile data
     */
    function registerCreator(string memory username, string memory profileURI) external {
        require(!creators[msg.sender].exists, "Creator already registered");
        require(bytes(username).length > 0, "Username cannot be empty");
        require(usernameToAddress[username] == address(0), "Username taken");

        creators[msg.sender] = CreatorProfile({
            creatorAddress: msg.sender,
            username: username,
            profileURI: profileURI,
            totalPrompts: 0,
            totalUsage: 0,
            totalEarnings: 0,
            reputationScore: 100,
            joinedAt: block.timestamp,
            isVerified: false,
            exists: true
        });

        usernameToAddress[username] = msg.sender;
        creatorAddresses.push(msg.sender);

        emit CreatorRegistered(msg.sender, username, block.timestamp);
    }

    /**
     * @dev Update creator profile URI
     * @param profileURI New profile URI
     */
    function updateProfile(string memory profileURI) external {
        require(creators[msg.sender].exists, "Creator not registered");
        
        creators[msg.sender].profileURI = profileURI;
        
        emit ProfileUpdated(msg.sender, profileURI);
    }

    /**
     * @dev Increment total prompts for a creator
     * @param creator Creator address
     */
    function incrementPrompts(address creator) external onlyAuthorized {
        require(creators[creator].exists, "Creator not registered");
        creators[creator].totalPrompts++;
    }

    /**
     * @dev Increment total usage for a creator
     * @param creator Creator address
     */
    function incrementUsage(address creator) external onlyAuthorized {
        require(creators[creator].exists, "Creator not registered");
        creators[creator].totalUsage++;
    }

    /**
     * @dev Add earnings to a creator
     * @param creator Creator address
     * @param amount Amount to add
     */
    function addEarnings(address creator, uint256 amount) external onlyAuthorized {
        require(creators[creator].exists, "Creator not registered");
        creators[creator].totalEarnings += amount;
    }

    /**
     * @dev Update reputation score
     * @param creator Creator address
     * @param newScore New reputation score
     */
    function updateReputation(address creator, uint256 newScore) external onlyAuthorized {
        require(creators[creator].exists, "Creator not registered");
        
        creators[creator].reputationScore = newScore;
        
        emit ReputationUpdated(creator, newScore);
    }

    /**
     * @dev Verify a creator
     * @param creator Creator address
     */
    function verifyCreator(address creator) external onlyOwner {
        require(creators[creator].exists, "Creator not registered");
        
        creators[creator].isVerified = true;
        
        emit CreatorVerified(creator);
    }

    /**
     * @dev Get creator profile
     * @param creator Creator address
     * @return Creator profile
     */
    function getCreatorProfile(address creator) external view returns (CreatorProfile memory) {
        require(creators[creator].exists, "Creator not registered");
        return creators[creator];
    }

    /**
     * @dev Check if a creator is registered
     * @param creator Creator address
     * @return True if registered
     */
    function isCreatorRegistered(address creator) external view returns (bool) {
        return creators[creator].exists;
    }

    /**
     * @dev Get total number of creators
     * @return Total count
     */
    function getTotalCreators() external view returns (uint256) {
        return creatorAddresses.length;
    }

    /**
     * @dev Authorize an updater
     * @param updater Address to authorize
     */
    function authorizeUpdater(address updater) external onlyOwner {
        authorizedUpdaters[updater] = true;
    }

    /**
     * @dev Revoke updater authorization
     * @param updater Address to revoke
     */
    function revokeUpdater(address updater) external onlyOwner {
        authorizedUpdaters[updater] = false;
    }
}

