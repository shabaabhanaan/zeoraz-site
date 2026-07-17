/**
 * In-Memory Sliding Window Rate Limiting Service
 * Provides lightweight protection against brute-force logins and email spamming.
 */

interface RateLimiterOptions {
  limit: number;     // Maximum number of requests allowed
  windowMs: number;  // Time window in milliseconds
}

class MemoryRateLimiter {
  private cache = new Map<string, number[]>();

  /**
   * Checks if a request key has exceeded the limit in the given window.
   */
  public isRateLimited(key: string, options: RateLimiterOptions): boolean {
    const now = Date.now();
    const timestamps = this.cache.get(key) || [];

    // Filter out timestamps outside the sliding window
    const windowStart = now - options.windowMs;
    const validTimestamps = timestamps.filter((t) => t > windowStart);

    if (validTimestamps.length >= options.limit) {
      return true;
    }

    // Append the new request timestamp and update cache
    validTimestamps.push(now);
    this.cache.set(key, validTimestamps);
    
    // Periodically clean up cache to prevent memory leaks
    this.cleanup();

    return false;
  }

  /**
   * Returns the remaining tokens/requests allowed for a key.
   */
  public getRemaining(key: string, options: RateLimiterOptions): number {
    const now = Date.now();
    const timestamps = this.cache.get(key) || [];
    const windowStart = now - options.windowMs;
    const validTimestamps = timestamps.filter((t) => t > windowStart);
    return Math.max(0, options.limit - validTimestamps.length);
  }

  /**
   * Cleans up expired items from memory cache to prevent memory leaks.
   */
  private cleanup() {
    const now = Date.now();
    // Keep entries from the last 2 hours max
    const maxAge = 2 * 60 * 60 * 1000;
    
    for (const [key, timestamps] of this.cache.entries()) {
      const active = timestamps.filter((t) => now - t < maxAge);
      if (active.length === 0) {
        this.cache.delete(key);
      } else {
        this.cache.set(key, active);
      }
    }
  }
}

export const rateLimiter = new MemoryRateLimiter();
