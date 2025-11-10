'use server';

import { SecureDataHandler } from '@/lib/security/encryption';
import { TempStorage } from '@/lib/redis/temp-storage';
import { applicationSchema } from '@/lib/security/schema';

export class ApplicationServiceServer {
  static async submitApplication(applicationData: any) {
    try {
      // 1. Validate the complete application data
      const validatedData = applicationSchema.parse(applicationData);

      // 2. Store temporarily with encryption in Redis
      const applicationId = await SecureDataHandler.storeTemporaryApplication(validatedData, 48, 'application');

      // 3. Send email notification to admin
      await this.sendAdminNotification(applicationId, validatedData);

      // 4. Send confirmation email to applicant
      await this.sendApplicantConfirmation(validatedData.personalInfo.email, applicationId);

      // 5. Log the submission
      await this.auditLog('application_submitted', applicationId, {
        applicant: `${validatedData.personalInfo.firstName} ${validatedData.personalInfo.lastName}`,
        loanType: validatedData.loanDetails.loanType,
        amount: validatedData.loanDetails.loanAmount
      });

      return {
        success: true,
        applicationId,
        message: 'Application submitted successfully'
      };
    } catch (error) {
      console.error('Application submission error:', error);
      
      await this.auditLog('application_error', 'unknown', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      throw error;
    }
  }

  static async saveDraft(applicationData: Partial<any>, draftId?: string) {
    try {
      const finalDraftId = await SecureDataHandler.storeTemporaryApplication(
        applicationData, 
        168, // 7 days expiry for drafts
        'draft'
      );

      await this.auditLog('draft_saved', finalDraftId, {
        hasPersonalInfo: !!applicationData.personalInfo,
        hasBusinessInfo: !!applicationData.businessInfo,
        hasLoanDetails: !!applicationData.loanDetails
      });

      return {
        success: true,
        draftId: finalDraftId,
        message: 'Draft saved successfully'
      };
    } catch (error) {
      console.error('Draft save error:', error);
      throw error;
    }
  }

  static async loadDraft(draftId: string) {
    try {
      const draftData = await SecureDataHandler.retrieveApplication(draftId, 'draft');
      
      if (!draftData) {
        throw new Error('Draft not found or expired');
      }

      await this.auditLog('draft_loaded', draftId, { loaded: true });

      return {
        success: true,
        data: draftData
      };
    } catch (error) {
      console.error('Draft load error:', error);
      throw error;
    }
  }

  private static async sendAdminNotification(applicationId: string, data: any) {
    try {
      await fetch(`${process.env.NEXTAUTH_URL}/api/email/admin-notification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId,
          applicantName: `${data.personalInfo.firstName} ${data.personalInfo.lastName}`,
          loanAmount: data.loanDetails.loanAmount,
          loanType: data.loanDetails.loanType,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Admin notification error:', error);
    }
  }

  private static async sendApplicantConfirmation(email: string, applicationId: string) {
    try {
      await fetch(`${process.env.NEXTAUTH_URL}/api/email/application-confirmation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          applicationId,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Applicant confirmation error:', error);
    }
  }

  private static async auditLog(action: string, resourceId: string, details: any) {
    try {
      const logEntry = {
        action,
        resourceId,
        details,
        timestamp: new Date().toISOString(),
      };
      await TempStorage.storeAuditLog(logEntry);
    } catch (error) {
      console.error('Audit log error:', error);
    }
  }
}