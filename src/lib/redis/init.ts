import { testRedisConnection } from './client';
import { SecureDataHandler } from '@/lib/security/encryption';

export async function initializeApplicationServices(): Promise<boolean> {
  // Only run on server
  if (typeof window !== 'undefined') {
    return true;
  }

  console.log('🚀 Initializing application services...');
  
  try {
    // Test Redis connection
    const redisConnected = await testRedisConnection();
    if (!redisConnected) {
      console.error('❌ Failed to connect to Redis');
      return false;
    }
    
    console.log('✅ Redis connection successful');
    
    // Validate encryption key
    const encryptionValid = SecureDataHandler.validateEncryptionKey();
    if (!encryptionValid) {
      console.error('❌ Encryption key validation failed');
      return false;
    }
    
    console.log('✅ Encryption key validated');
    console.log('✅ All services initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Service initialization failed:', error);
    return false;
  }
}

// Don't auto-initialize - call this explicitly where needed
// if (typeof window === 'undefined') {
//   initializeApplicationServices().catch(console.error);
// }