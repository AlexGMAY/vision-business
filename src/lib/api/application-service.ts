// import { SecureDataHandler } from '@/lib/security/encryption';
// import { ApplicationData, applicationSchema } from '../security/schema';

// export class ApplicationService {
//   static async submitApplication(applicationData: ApplicationData) {
//     try {
//       // 1. Validate the complete application data
//       const validatedData = applicationSchema.parse(applicationData);

//       // 2. Store temporarily with encryption
//       const applicationId = await SecureDataHandler.storeTemporaryApplication(validatedData);

//       // 3. Send email notification to admin
//       await this.sendAdminNotification(applicationId, validatedData);

//       // 4. Send confirmation email to applicant
//       await this.sendApplicantConfirmation(validatedData.personalInfo.email, applicationId);

//       return {
//         success: true,
//         applicationId,
//         message: 'Application submitted successfully'
//       };
//     } catch (error) {
//       console.error('Application submission error:', error);
//       return {
//         success: false,
//         error: 'Failed to submit application. Please try again.'
//       };
//     }
//   }

  

//   static async saveDraft(applicationData: Partial<ApplicationData>, draftId?: string) {
//     // Save draft with auto-expiry (7 days)
//     const draftApplicationId = draftId || `draft_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
//     await SecureDataHandler.storeTemporaryApplication(
//       applicationData as ApplicationData, 
//       168 // 7 days expiry for drafts
//     );

//     return draftApplicationId;
//   }

//   static async loadDraft(draftId: string): Promise<Partial<ApplicationData> | null> {
//     return await SecureDataHandler.retrieveApplication(draftId);
//   }
// }


import { SecureDataHandler } from '@/lib/security/encryption';
import { TempStorage } from '@/lib/redis/temp-storage';
import { ApplicationData, applicationSchema } from '../security/schema';

export class ApplicationService {
  static async submitApplication(applicationData: any) {
    try {
      const response = await fetch('/api/application/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit application');
      }

      return result;
    } catch (error) {
      console.error('Application submission error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to submit application. Please try again.'
      };
    }
  }

  static async saveDraft(applicationData: Partial<any>, draftId?: string) {
    try {
      const response = await fetch('/api/application/draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          draftData: applicationData,
          draftId
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save draft');
      }

      return result;
    } catch (error) {
      console.error('Draft save error:', error);
      return {
        success: false,
        error: 'Failed to save draft'
      };
    }
  }

  static async loadDraft(draftId: string) {
    try {
      const response = await fetch(`/api/application/draft?draftId=${draftId}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to load draft');
      }

      return result;
    } catch (error) {
      console.error('Draft load error:', error);
      return {
        success: false,
        error: 'Failed to load draft'
      };
    }
  }   
}