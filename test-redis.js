// test-redis.js
const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url: "https://diverse-lamb-34272.upstash.io",
  token: "AYXgAAIncDIyZThlM2E3OTViYmI0NjczOWY4YmEyMzhlZGRhM2NhZHAyMzQyNzI",
});

async function test() {
  try {
    console.log('Testing Redis connection...');
    const result = await redis.ping();
    console.log('✅ Redis ping:', result);
    
    await redis.set('test', 'value');
    const value = await redis.get('test');
    console.log('✅ Redis set/get:', value);
    
    await redis.del('test');
    console.log('✅ Redis test completed successfully');
  } catch (error) {
    console.error('❌ Redis test failed:', error);
  }
}

test();