/**
 * Local storage utility functions
 */

const STORAGE_PREFIX = 'promptfi_';

export const storage = {
  /**
   * Set item in local storage
   */
  set: (key: string, value: any): void => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  /**
   * Get item from local storage
   */
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
      return item ? JSON.parse(item) : defaultValue ?? null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue ?? null;
    }
  },

  /**
   * Remove item from local storage
   */
  remove: (key: string): void => {
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  /**
   * Clear all items with prefix
   */
  clear: (): void => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(STORAGE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

// Specific storage keys
export const STORAGE_KEYS = {
  WALLET_ADDRESS: 'wallet_address',
  LAST_NETWORK: 'last_network',
  USER_PREFERENCES: 'user_preferences',
  RECENT_PROMPTS: 'recent_prompts',
  FAVORITES: 'favorites'
};

