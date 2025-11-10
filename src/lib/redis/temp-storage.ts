import { redis } from './client';

export interface StoredApplication {
  id: string;
  data: string; // Encrypted data
  createdAt: string;
  expiresAt: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  type: 'application' | 'draft';
}

export class TempStorage {
  private static readonly APPLICATION_PREFIX = 'app:';
  private static readonly DRAFT_PREFIX = 'draft:';
  private static readonly AUDIT_LOG_PREFIX = 'audit:';

  // Store application with TTL
  static async storeApplication(application: Omit<StoredApplication, 'type'>): Promise<void> {
    try {
      const key = `${this.APPLICATION_PREFIX}${application.id}`;
      const ttl = Math.floor((new Date(application.expiresAt).getTime() - Date.now()) / 1000);
      
      if (ttl <= 0) {
        throw new Error('Application has already expired');
      }
      
      await redis.get().setex(key, ttl, JSON.stringify(application));
      
      // Also add to applications list for admin portal
      await redis.get().sadd('applications:pending', application.id);
    } catch (error) {
      console.error('Failed to store application:', error);
      throw new Error(`Application storage failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Store draft with TTL
  static async storeDraft(draft: Omit<StoredApplication, 'type'>): Promise<void> {
    try {
      const key = `${this.DRAFT_PREFIX}${draft.id}`;
      const ttl = Math.floor((new Date(draft.expiresAt).getTime() - Date.now()) / 1000);
      
      if (ttl <= 0) {
        throw new Error('Draft has already expired');
      }
      
      await redis.get().setex(key, ttl, JSON.stringify({ ...draft, type: 'draft' }));
    } catch (error) {
      console.error('Failed to store draft:', error);
      throw new Error(`Draft storage failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Retrieve application by ID
  static async getApplication(applicationId: string): Promise<StoredApplication | null> {
    try {
      const key = `${this.APPLICATION_PREFIX}${applicationId}`;
      const data = await redis.get().get(key);
      
      if (!data) return null;
      
      return JSON.parse(data as string) as StoredApplication;
    } catch (error) {
      console.error('Failed to get application:', applicationId, error);
      throw new Error(`Failed to retrieve application: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Retrieve draft by ID
  static async getDraft(draftId: string): Promise<StoredApplication | null> {
    try {
      const key = `${this.DRAFT_PREFIX}${draftId}`;
      const data = await redis.get().get(key);
      
      if (!data) return null;
      
      return JSON.parse(data as string) as StoredApplication;
    } catch (error) {
      console.error('Failed to get draft:', draftId, error);
      throw new Error(`Failed to retrieve draft: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Get all pending applications (for admin portal)
  static async getPendingApplications(): Promise<string[]> {
    try {
      return await redis.get().smembers('applications:pending');
    } catch (error) {
      console.error('Failed to get pending applications:', error);
      return [];
    }
  }

  // Update application status
  static async updateApplicationStatus(applicationId: string, status: StoredApplication['status']): Promise<void> {
    try {
      const key = `${this.APPLICATION_PREFIX}${applicationId}`;
      const application = await this.getApplication(applicationId);
      
      if (application) {
        application.status = status;
        await redis.get().set(key, JSON.stringify(application));
        
        // Remove from pending if status changed
        if (status !== 'pending') {
          await redis.get().srem('applications:pending', applicationId);
        }
      }
    } catch (error) {
      console.error('Failed to update application status:', applicationId, status, error);
      throw new Error(`Failed to update application status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Clean up expired applications (cron job)
  static async cleanupExpired(): Promise<void> {
    try {
      const pendingApps = await this.getPendingApplications();
      
      for (const appId of pendingApps) {
        const application = await this.getApplication(appId);
        if (application && new Date(application.expiresAt) < new Date()) {
          await redis.get().del(`${this.APPLICATION_PREFIX}${appId}`);
          await redis.get().srem('applications:pending', appId);
        }
      }
    } catch (error) {
      console.error('Failed to cleanup expired applications:', error);
      // Don't throw - this is a background task
    }
  }

  // Get application statistics (for admin dashboard)
  static async getApplicationStats(): Promise<{
    total: number;
    pending: number;
    reviewed: number;
    approved: number;
    rejected: number;
  }> {
    try {
      const pending = await redis.get().scard('applications:pending');
      
      // Note: In production, you'd want to maintain separate sets for each status
      // This is a simplified version
      
      return {
        total: pending, // Simplified - you'd track total separately
        pending,
        reviewed: 0,
        approved: 0,
        rejected: 0
      };
    } catch (error) {
      console.error('Failed to get application stats:', error);
      return {
        total: 0,
        pending: 0,
        reviewed: 0,
        approved: 0,
        rejected: 0
      };
    }
  }

  static async storeAuditLog(logEntry: any): Promise<void> {
    try {
      const key = `${this.AUDIT_LOG_PREFIX}${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      // Store audit logs for 90 days
      await redis.get().setex(key, 90 * 24 * 60 * 60, JSON.stringify(logEntry));
    } catch (error) {
      console.error('Failed to store audit log:', error);
      // Don't throw for audit logs - they shouldn't break main functionality
    }
  }

  static async getAuditLogs(action?: string, limit: number = 100): Promise<any[]> {
    try {
      // Note: This is a simplified implementation
      // In production, you'd use Redis Streams or a proper logging solution
      const keys = await redis.get().keys(`${this.AUDIT_LOG_PREFIX}*`);
      const logs = await redis.get().mget(...keys);
      
      return logs
        .filter(log => log !== null)
        .map(log => JSON.parse(log as string))
        .filter(log => !action || log.action === action)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, limit);
    } catch (error) {
      console.error('Failed to get audit logs:', error);
      return [];
    }
  }
}