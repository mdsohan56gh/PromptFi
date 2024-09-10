/**
 * Validation utility functions
 */

/**
 * Validate Ethereum address
 * @param address Address to validate
 * @returns True if valid
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validate prompt content
 * @param content Prompt content
 * @returns Error message or null
 */
export function validatePromptContent(content: string): string | null {
  if (!content || content.trim().length === 0) {
    return 'Prompt content cannot be empty';
  }
  
  if (content.length < 10) {
    return 'Prompt must be at least 10 characters long';
  }
  
  if (content.length > 5000) {
    return 'Prompt cannot exceed 5000 characters';
  }
  
  return null;
}

/**
 * Validate royalty ratio
 * @param ratio Royalty ratio in basis points
 * @returns Error message or null
 */
export function validateRoyaltyRatio(ratio: number): string | null {
  if (ratio < 0) {
    return 'Royalty ratio cannot be negative';
  }
  
  if (ratio > 10000) {
    return 'Royalty ratio cannot exceed 100%';
  }
  
  return null;
}

/**
 * Validate username
 * @param username Username to validate
 * @returns Error message or null
 */
export function validateUsername(username: string): string | null {
  if (!username || username.trim().length === 0) {
    return 'Username cannot be empty';
  }
  
  if (username.length < 3) {
    return 'Username must be at least 3 characters long';
  }
  
  if (username.length > 20) {
    return 'Username cannot exceed 20 characters';
  }
  
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return 'Username can only contain letters, numbers, and underscores';
  }
  
  return null;
}

/**
 * Validate IPFS CID
 * @param cid IPFS CID
 * @returns True if valid
 */
export function isValidIPFSCid(cid: string): boolean {
  // Basic validation for IPFS CIDv0 and CIDv1
  return /^Qm[1-9A-HJ-NP-Za-km-z]{44}$/.test(cid) || /^b[a-z2-7]{58}$/.test(cid);
}

/**
 * Validate price
 * @param price Price in ETH
 * @returns Error message or null
 */
export function validatePrice(price: number): string | null {
  if (price <= 0) {
    return 'Price must be greater than 0';
  }
  
  if (price > 1000000) {
    return 'Price is unreasonably high';
  }
  
  return null;
}

