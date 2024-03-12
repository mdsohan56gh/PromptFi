// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title PromptNFT
 * @dev ERC-1155 token contract for AI Prompt NFTs with usage tracking
 */
contract PromptNFT is ERC1155, Ownable, ReentrancyGuard {
    
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

    // Token ID counter
    uint256 private _tokenIdCounter;
    
    // Mapping from token ID to prompt metadata
    mapping(uint256 => PromptMetadata) public prompts;
    
    // Mapping from prompt hash to token ID (prevent duplicates)
    mapping(bytes32 => uint256) public promptHashToTokenId;
    
    // Events
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

    constructor() ERC1155("https://api.promptfi.io/metadata/{id}.json") Ownable(msg.sender) {
        _tokenIdCounter = 1;
    }

    /**
     * @dev Mint a new Prompt NFT
     * @param promptHash Keccak256 hash of the prompt content
     * @param modelType AI model type (e.g., "GPT-4", "Claude", "Llama")
     * @param royaltyRatio Royalty percentage (0-10000, where 10000 = 100%)
     * @param metadataURI IPFS or Arweave URI for metadata
     * @return tokenId The newly created token ID
     */
    function mintPromptNFT(
        bytes32 promptHash,
        string memory modelType,
        uint256 royaltyRatio,
        string memory metadataURI
    ) external nonReentrant returns (uint256) {
        require(promptHashToTokenId[promptHash] == 0, "Prompt already exists");
        require(royaltyRatio <= 10000, "Invalid royalty ratio");
        require(bytes(metadataURI).length > 0, "Empty metadata URI");

        uint256 tokenId = _tokenIdCounter++;
        
        prompts[tokenId] = PromptMetadata({
            promptHash: promptHash,
            modelType: modelType,
            creator: msg.sender,
            usageCount: 0,
            royaltyRatio: royaltyRatio,
            metadataURI: metadataURI,
            createdAt: block.timestamp,
            exists: true
        });

        promptHashToTokenId[promptHash] = tokenId;
        
        _mint(msg.sender, tokenId, 1, "");

        emit PromptMinted(tokenId, msg.sender, promptHash, modelType, metadataURI);

        return tokenId;
    }

    /**
     * @dev Record usage of a prompt
     * @param tokenId The token ID of the prompt
     */
    function recordUsage(uint256 tokenId) external {
        require(prompts[tokenId].exists, "Prompt does not exist");
        
        prompts[tokenId].usageCount++;
        
        emit PromptUsed(tokenId, msg.sender, block.timestamp);
    }

    /**
     * @dev Get prompt metadata
     * @param tokenId The token ID
     * @return Prompt metadata struct
     */
    function getPromptMetadata(uint256 tokenId) external view returns (PromptMetadata memory) {
        require(prompts[tokenId].exists, "Prompt does not exist");
        return prompts[tokenId];
    }

    /**
     * @dev Get total number of prompts minted
     * @return Total count
     */
    function getTotalPrompts() external view returns (uint256) {
        return _tokenIdCounter - 1;
    }

    /**
     * @dev Override URI function to return custom metadata URI
     */
    function uri(uint256 tokenId) public view override returns (string memory) {
        require(prompts[tokenId].exists, "Prompt does not exist");
        return prompts[tokenId].metadataURI;
    }
}

