import CryptoJS from 'crypto-js';
import { TempStorage, StoredApplication } from '@/lib/redis/temp-storage';

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_FORM_ENCRYPTION_KEY!;

if (!ENCRYPTION_KEY) {
  throw new Error('FORM_ENCRYPTION_KEY environment variable is required');
}

export class SecureDataHandler {
  private static encryptData(data: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
  }

  private static decryptData(encryptedData: string): any {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      
      if (!decrypted) {
        throw new Error('Failed to decrypt data');
      }
      
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Invalid encrypted data');
    }
  }

  // Store application data temporarily
  static async storeTemporaryApplication(data: any, expiryHours: number = 48, type: 'application' | 'draft' = 'application'): Promise<string> {
    const id = type === 'application' 
      ? `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      : `draft_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const secureData = {
      id,
      data: this.encryptData(data),
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + expiryHours * 60 * 60 * 1000).toISOString(),
      status: 'pending' as const
    };

    if (type === 'application') {
      await TempStorage.storeApplication(secureData);
    } else {
      await TempStorage.storeDraft(secureData);
    }
    
    return id;
  }

  static async retrieveApplication(applicationId: string, type: 'application' | 'draft' = 'application'): Promise<any | null> {
    const stored = type === 'application' 
      ? await TempStorage.getApplication(applicationId)
      : await TempStorage.getDraft(applicationId);
    
    if (!stored) {
      return null;
    }

    // Check if expired
    if (new Date(stored.expiresAt) < new Date()) {
      // Auto-delete expired data
      await this.deleteApplication(applicationId, type);
      return null;
    }

    return this.decryptData(stored.data);
  }

  static async deleteApplication(applicationId: string, type: 'application' | 'draft' = 'application'): Promise<void> {
    // Implementation would delete from Redis
    // This is handled by TTL in our current setup
    console.log(`Deleting ${type}: ${applicationId}`);
  }

  // Validate encryption key on startup
  static validateEncryptionKey(): boolean {
    try {
      const testData = { test: 'data' };
      const encrypted = this.encryptData(testData);
      const decrypted = this.decryptData(encrypted);
      return JSON.stringify(decrypted) === JSON.stringify(testData);
    } catch (error) {
      console.error('Encryption key validation failed:', error);
      return false;
    }
  }
}