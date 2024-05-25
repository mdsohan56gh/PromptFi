/**
 * IPFS utility functions for uploading and retrieving metadata
 */

export interface PromptMetadata {
  name: string;
  description: string;
  promptContent: string;
  modelType: string;
  tags: string[];
  createdAt: string;
  creator: string;
}

/**
 * Upload metadata to IPFS
 * @param metadata Prompt metadata object
 * @returns IPFS CID
 */
export async function uploadToIPFS(metadata: PromptMetadata): Promise<string> {
  // In production, use Pinata, Web3.Storage, or similar service
  const endpoint = process.env.NEXT_PUBLIC_IPFS_ENDPOINT || 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
  const apiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY || '';
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(metadata)
    });
    
    const result = await response.json();
    return result.IpfsHash;
  } catch (error) {
    console.error('IPFS upload error:', error);
    throw new Error('Failed to upload to IPFS');
  }
}

/**
 * Fetch metadata from IPFS
 * @param cid IPFS CID
 * @returns Metadata object
 */
export async function fetchFromIPFS(cid: string): Promise<PromptMetadata> {
  const gateway = process.env.NEXT_PUBLIC_IPFS_GATEWAY || 'https://gateway.pinata.cloud/ipfs/';
  
  try {
    const response = await fetch(`${gateway}${cid}`);
    return await response.json();
  } catch (error) {
    console.error('IPFS fetch error:', error);
    throw new Error('Failed to fetch from IPFS');
  }
}

/**
 * Generate IPFS URI from CID
 * @param cid IPFS CID
 * @returns IPFS URI
 */
export function getIPFSUri(cid: string): string {
  return `ipfs://${cid}`;
}

/**
 * Convert IPFS URI to HTTP gateway URL
 * @param uri IPFS URI
 * @returns HTTP URL
 */
export function ipfsToHttp(uri: string): string {
  const gateway = process.env.NEXT_PUBLIC_IPFS_GATEWAY || 'https://gateway.pinata.cloud/ipfs/';
  const cid = uri.replace('ipfs://', '');
  return `${gateway}${cid}`;
}

