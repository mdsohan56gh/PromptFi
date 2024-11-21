// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PromptValidator
 * @dev Library for validating prompt-related data
 */
library PromptValidator {
    
    /**
     * @dev Validate royalty ratio
     * @param royaltyRatio Royalty ratio in basis points
     * @return True if valid
     */
    function isValidRoyaltyRatio(uint256 royaltyRatio) internal pure returns (bool) {
        return royaltyRatio <= 10000; // Max 100%
    }

    /**
     * @dev Validate prompt hash
     * @param promptHash Hash to validate
     * @return True if valid
     */
    function isValidPromptHash(bytes32 promptHash) internal pure returns (bool) {
        return promptHash != bytes32(0);
    }

    /**
     * @dev Validate address
     * @param addr Address to validate
     * @return True if valid
     */
    function isValidAddress(address addr) internal pure returns (bool) {
        return addr != address(0);
    }

    /**
     * @dev Validate string is not empty
     * @param str String to validate
     * @return True if not empty
     */
    function isNotEmpty(string memory str) internal pure returns (bool) {
        return bytes(str).length > 0;
    }

    /**
     * @dev Validate price
     * @param price Price to validate
     * @return True if valid
     */
    function isValidPrice(uint256 price) internal pure returns (bool) {
        return price > 0;
    }

    /**
     * @dev Validate duration
     * @param duration Duration in seconds
     * @return True if valid
     */
    function isValidDuration(uint256 duration) internal pure returns (bool) {
        return duration > 0 && duration <= 365 days;
    }
}

