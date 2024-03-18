// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title UsageTracker
 * @dev Tracks prompt usage events and maintains usage statistics
 */
contract UsageTracker is Ownable, ReentrancyGuard {
    
    struct UsageRecord {
        uint256 promptId;
        address caller;
        uint256 timestamp;
        uint256 fee;
        string sessionId;
    }

    // Array of all usage records
    UsageRecord[] public usageRecords;
    
    // Mapping from prompt ID to usage indices
    mapping(uint256 => uint256[]) public promptUsageIndices;
    
    // Mapping from caller to usage indices
    mapping(address => uint256[]) public callerUsageIndices;
    
    // Mapping from prompt ID to total usage count
    mapping(uint256 => uint256) public promptUsageCount;
    
    // Mapping from caller to total calls made
    mapping(address => uint256) public callerTotalCalls;
    
    // Authorized callers (contracts that can record usage)
    mapping(address => bool) public authorizedCallers;

    // Events
    event UsageRecorded(
        uint256 indexed promptId,
        address indexed caller,
        uint256 fee,
        uint256 timestamp,
        string sessionId
    );
    
    event CallerAuthorized(address indexed caller);
    event CallerRevoked(address indexed caller);

    constructor() Ownable(msg.sender) {
        authorizedCallers[msg.sender] = true;
    }

    modifier onlyAuthorized() {
        require(authorizedCallers[msg.sender], "Caller not authorized");
        _;
    }

    /**
     * @dev Record a prompt usage event
     * @param promptId The ID of the prompt being used
     * @param caller The address calling/using the prompt
     * @param fee The fee paid for this usage
     * @param sessionId Optional session identifier
     */
    function recordUsage(
        uint256 promptId,
        address caller,
        uint256 fee,
        string memory sessionId
    ) external onlyAuthorized nonReentrant {
        require(promptId > 0, "Invalid prompt ID");
        require(caller != address(0), "Invalid caller address");

        uint256 recordIndex = usageRecords.length;
        
        usageRecords.push(UsageRecord({
            promptId: promptId,
            caller: caller,
            timestamp: block.timestamp,
            fee: fee,
            sessionId: sessionId
        }));

        promptUsageIndices[promptId].push(recordIndex);
        callerUsageIndices[caller].push(recordIndex);
        
        promptUsageCount[promptId]++;
        callerTotalCalls[caller]++;

        emit UsageRecorded(promptId, caller, fee, block.timestamp, sessionId);
    }

    /**
     * @dev Get usage count for a specific prompt
     * @param promptId The prompt ID
     * @return Usage count
     */
    function getPromptUsageCount(uint256 promptId) external view returns (uint256) {
        return promptUsageCount[promptId];
    }

    /**
     * @dev Get total calls made by a caller
     * @param caller The caller address
     * @return Total calls
     */
    function getCallerTotalCalls(address caller) external view returns (uint256) {
        return callerTotalCalls[caller];
    }

    /**
     * @dev Get usage records for a specific prompt
     * @param promptId The prompt ID
     * @param offset Starting index
     * @param limit Maximum number of records to return
     * @return Array of usage records
     */
    function getPromptUsageRecords(
        uint256 promptId,
        uint256 offset,
        uint256 limit
    ) external view returns (UsageRecord[] memory) {
        uint256[] memory indices = promptUsageIndices[promptId];
        
        if (offset >= indices.length) {
            return new UsageRecord[](0);
        }
        
        uint256 end = offset + limit;
        if (end > indices.length) {
            end = indices.length;
        }
        
        uint256 resultLength = end - offset;
        UsageRecord[] memory records = new UsageRecord[](resultLength);
        
        for (uint256 i = 0; i < resultLength; i++) {
            records[i] = usageRecords[indices[offset + i]];
        }
        
        return records;
    }

    /**
     * @dev Authorize a caller to record usage
     * @param caller Address to authorize
     */
    function authorizeCaller(address caller) external onlyOwner {
        require(caller != address(0), "Invalid address");
        authorizedCallers[caller] = true;
        emit CallerAuthorized(caller);
    }

    /**
     * @dev Revoke authorization from a caller
     * @param caller Address to revoke
     */
    function revokeCaller(address caller) external onlyOwner {
        authorizedCallers[caller] = false;
        emit CallerRevoked(caller);
    }

    /**
     * @dev Get total number of usage records
     * @return Total count
     */
    function getTotalUsageRecords() external view returns (uint256) {
        return usageRecords.length;
    }
}

