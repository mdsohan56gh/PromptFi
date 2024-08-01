// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IPromptNFT
 * @dev Interface for PromptNFT contract
 */
interface IPromptNFT {
    
    struct PromptMetadata {
        bytes32 promptHash;
        string modelType;
        address creator;
        uint256 usageCount;
        uint256 royaltyRatio;
        string metadataURI;
        uint256 createdAt;
        bool exists;
    }

    event PromptMinted(
        uint256 indexed tokenId,
        address indexed creator,
        bytes32 promptHash,
        string modelType,
        string metadataURI
    );
    
    event PromptUsed(
        uint256 indexed tokenId,
        address indexed user,
        uint256 timestamp
    );

    function mintPromptNFT(
        bytes32 promptHash,
        string memory modelType,
        uint256 royaltyRatio,
        string memory metadataURI
    ) external returns (uint256);

    function recordUsage(uint256 tokenId) external;

    function getPromptMetadata(uint256 tokenId) external view returns (PromptMetadata memory);

    function getTotalPrompts() external view returns (uint256);
}

