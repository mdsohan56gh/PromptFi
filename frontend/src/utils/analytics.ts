/**
 * Analytics utility functions
 */

type EventParams = Record<string, any>;

export const analytics = {
  /**
   * Track page view
   */
  pageView: (path: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: path
      });
    }
  },

  /**
   * Track event
   */
  event: (action: string, params?: EventParams) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', action, params);
    }
  },

  /**
   * Track custom events
   */
  track: {
    promptMinted: (promptId: number) => {
      analytics.event('prompt_minted', {
        prompt_id: promptId,
        category: 'engagement'
      });
    },

    promptViewed: (promptId: number) => {
      analytics.event('prompt_viewed', {
        prompt_id: promptId,
        category: 'engagement'
      });
    },

    promptPurchased: (promptId: number, price: string) => {
      analytics.event('prompt_purchased', {
        prompt_id: promptId,
        value: price,
        category: 'conversion'
      });
    },

    walletConnected: (address: string) => {
      analytics.event('wallet_connected', {
        wallet_address: address.slice(0, 10),
        category: 'user'
      });
    },

    creatorRegistered: (username: string) => {
      analytics.event('creator_registered', {
        username,
        category: 'user'
      });
    },

    error: (errorMessage: string, context?: string) => {
      analytics.event('error', {
        error_message: errorMessage,
        context,
        category: 'error'
      });
    }
  }
};

