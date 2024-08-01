// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IUsageTracker
 * @dev Interface for UsageTracker contract
 */
interface IUsageTracker {
    
    struct UsageRecord {
        uint256 promptId;
        address caller;
        uint256 timestamp;
        uint256 fee;
        string sessionId;
    }

    event UsageRecorded(
        uint256 indexed promptId,
        address indexed caller,
        uint256 fee,
        uint256 timestamp,
        string sessionId
    );

    function recordUsage(
        uint256 promptId,
        address caller,
        uint256 fee,
        string memory sessionId
    ) external;

    function getPromptUsageCount(uint256 promptId) external view returns (uint256);

    function getCallerTotalCalls(address caller) external view returns (uint256);

    function getTotalUsageRecords() external view returns (uint256);
}

