/**
 * Utility functions for formatting data
 */

/**
 * Format wallet address to short version
 * @param address Full wallet address
 * @returns Shortened address (0x1234...5678)
 */
export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Format number with commas
 * @param num Number to format
 * @returns Formatted string
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Format ETH value
 * @param wei Value in wei
 * @returns Formatted ETH string
 */
export function formatEth(wei: bigint | string): string {
  const weiValue = typeof wei === 'string' ? BigInt(wei) : wei;
  const eth = Number(weiValue) / 1e18;
  return `${eth.toFixed(4)} ETH`;
}

/**
 * Format date to relative time
 * @param date Date to format
 * @returns Relative time string
 */
export function formatRelativeTime(date: Date | number): string {
  const timestamp = typeof date === 'number' ? date : date.getTime();
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
}

/**
 * Format percentage
 * @param value Value in basis points (10000 = 100%)
 * @returns Formatted percentage string
 */
export function formatPercentage(value: number): string {
  return `${(value / 100).toFixed(1)}%`;
}

/**
 * Truncate text with ellipsis
 * @param text Text to truncate
 * @param maxLength Maximum length
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

