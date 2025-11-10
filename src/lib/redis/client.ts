// import { Redis } from '@upstash/redis';

// // Using Upstash Redis (recommended for production)
// export const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL!,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN!,
// });

// // Alternative: For self-hosted Redis with Redis Insight
// // import IORedis from 'ioredis';

// // export const redis = new IORedis(process.env.REDIS_URL!, {
// //   maxRetriesPerRequest: 3,
// //   retryDelayOnFailover: 100,
// //   enableReadyCheck: true,
// //   lazyConnect: true,
// // });

// // Health check
// export const testRedisConnection = async (): Promise<boolean> => {
//   try {
//     await redis.ping();
//     console.log('✅ Redis connection successful');
//     return true;
//   } catch (error) {
//     console.error('❌ Redis connection failed:', error);
//     return false;
//   }
// };

// For development - mock client if Redis is not configured

// let redis: any;

// if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
//   // Use Upstash Redis in production
//   const { Redis } = require('@upstash/redis');
//   redis = new Redis({
//     url: process.env.UPSTASH_REDIS_REST_URL,
//     token: process.env.UPSTASH_REDIS_REST_TOKEN,
//   });
// } else {
//   // Development fallback - in-memory mock
//   console.warn('⚠️ Redis not configured - using in-memory storage (data will be lost on restart)');
//   const mockData = new Map();
  
//   redis = {
//     async setex(key: string, ttl: number, value: string) {
//       mockData.set(key, value);
//       setTimeout(() => mockData.delete(key), ttl * 1000);
//     },
//     async get(key: string) {
//       return mockData.get(key);
//     },
//     async del(key: string) {
//       mockData.delete(key);
//     },
//     async sadd(key: string, value: string) {
//       const set = mockData.get(key) || new Set();
//       set.add(value);
//       mockData.set(key, set);
//     },
//     async smembers(key: string) {
//       const set = mockData.get(key) || new Set();
//       return Array.from(set);
//     },
//     async srem(key: string, value: string) {
//       const set = mockData.get(key);
//       if (set) {
//         set.delete(value);
//       }
//     },
//     async keys(pattern: string) {
//       const allKeys = Array.from(mockData.keys());
//       const regex = new RegExp(pattern.replace('*', '.*'));
//       return allKeys.filter(key => regex.test(key));
//     },
//     async mget(...keys: string[]) {
//       return keys.map(key => mockData.get(key));
//     },
//     async ping() {
//       return 'PONG';
//     }
//   };
// }

// export { redis };

// export const testRedisConnection = async (): Promise<boolean> => {
//   try {
//     await redis.ping();
//     console.log('✅ Redis connection successful');
//     return true;
//   } catch (error) {
//     console.error('❌ Redis connection failed:', error);
//     return false;
//   }
// };

import { Redis } from '@upstash/redis';

class RedisClient {
  private redis!: Redis;
  
  constructor() {
    
    // Check if we're in browser environment
    // if (typeof window !== 'undefined') {
    //   throw new Error('Redis client should only be used on the server side');
    // }
    
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      throw new Error('UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are required');
    }

    if (typeof window === 'undefined' && 
      process.env.UPSTASH_REDIS_REST_URL && 
      process.env.UPSTASH_REDIS_REST_TOKEN) {
    
      this.redis = new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      });
    }
    
    // this.redis = new Redis({
    //   url: process.env.UPSTASH_REDIS_REST_URL,
    //   token: process.env.UPSTASH_REDIS_REST_TOKEN,
    // });
  }

  async setex(key: string, seconds: number, value: any) {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      
      // Check payload size (Upstash has limits)
      if (stringValue.length > 512 * 1024) { // 512KB limit for safety
        console.warn('Large payload detected:', key, stringValue.length);
      }
      
      const result = await this.redis.setex(key, seconds, stringValue);
      return result;
    } catch (error) {
      console.error('Redis setex error for key:', key, error);
      throw new Error(`Failed to store data in Redis: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async set(key: string, value: any) {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      return await this.redis.set(key, stringValue);
    } catch (error) {
      console.error('Redis set error for key:', key, error);
      throw new Error(`Failed to set data in Redis: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async get(key: string) {
    try {
      return await this.redis.get(key);
    } catch (error) {
      console.error('Redis get error for key:', key, error);
      throw new Error(`Failed to retrieve data from Redis: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async sadd(key: string, ...members: string[]) {
    try {
      // Fix: Pass members as an array to sadd
      return await this.redis.sadd(key, members);
    } catch (error) {
      console.error('Redis sadd error for key:', key, error);
      throw new Error(`Failed to add to set: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async scard(key: string) {
    try {
      return await this.redis.scard(key);
    } catch (error) {
      console.error('Redis scard error for key:', key, error);
      throw new Error(`Failed to get set cardinality: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async smembers(key: string) {
    try {
      return await this.redis.smembers(key);
    } catch (error) {
      console.error('Redis smembers error for key:', key, error);
      throw new Error(`Failed to get set members: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async srem(key: string, ...members: string[]) {
    try {
      // Fix: Pass members as an array to srem
      return await this.redis.srem(key, members);
    } catch (error) {
      console.error('Redis srem error for key:', key, error);
      throw new Error(`Failed to remove from set: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async del(key: string) {
    try {
      return await this.redis.del(key);
    } catch (error) {
      console.error('Redis del error for key:', key, error);
      throw new Error(`Failed to delete key: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async keys(pattern: string) {
    try {
      return await this.redis.keys(pattern);
    } catch (error) {
      console.error('Redis keys error for pattern:', pattern, error);
      throw new Error(`Failed to get keys: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async mget(...keys: string[]) {
    try {
      return await this.redis.mget(...keys);
    } catch (error) {
      console.error('Redis mget error for keys:', keys, error);
      throw new Error(`Failed to get multiple keys: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async ping() {
    try {
      return await this.redis.ping();
    } catch (error) {
      console.error('Redis ping error:', error);
      throw new Error(`Redis connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Create redis instance only on server side
let redisInstance: RedisClient | null = null;

export const redis = {
  get: () => {
    if (typeof window !== 'undefined') {
      throw new Error('Redis client should only be used on the server side');
    }
    if (!redisInstance) {
      redisInstance = new RedisClient();
    }
    return redisInstance;
  }
};

export const testRedisConnection = async (): Promise<boolean> => {
  try {
    const redisClient = redis.get();
    await redisClient.setex('connection_test', 60, 'test_value');
    const result = await redisClient.get('connection_test');
    await redisClient.del('connection_test');
    return result === 'test_value';
  } catch (error) {
    console.error('❌ Redis connection test failed:', error);
    return false;
  }
};