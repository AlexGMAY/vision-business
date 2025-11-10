import { NextRequest, NextResponse } from 'next/server';
import { applicationApiSchema} from '@/lib/security/schema';

export async function POST(request: NextRequest) {
  try {
    const applicationData = await request.json();
    
    // Dynamically import server-only modules INSIDE the function
    const { SecureDataHandler } = await import('@/lib/security/encryption');
    const { TempStorage } = await import('@/lib/redis/temp-storage');

    // 1. Validate the complete application data using API schema
    const validatedData = applicationApiSchema.parse(applicationData);
    // OR use the helper function:
    // const validatedData = validateApiApplication(applicationData);

    // 2. Store temporarily with encryption in Redis
    const applicationId = await SecureDataHandler.storeTemporaryApplication(validatedData, 48, 'application');

    // 3. Send email notification to admin
    await sendAdminNotification(applicationId, validatedData);

    // 4. Send confirmation email to applicant
    await sendApplicantConfirmation(validatedData.personalInfo.email, applicationId);

    // 5. Log the submission
    await auditLog('application_submitted', applicationId, {
      applicant: `${validatedData.personalInfo.firstName} ${validatedData.personalInfo.lastName}`,
      loanType: validatedData.loanDetails.loanType,
      amount: validatedData.loanDetails.loanAmount
    });

    return NextResponse.json({
      success: true,
      applicationId,
      message: 'Application submitted successfully'
    });

  } catch (error) {
    console.error('Application submission error:', error);
    
    // Log the error
    await auditLog('application_error', 'unknown', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit application. Please try again.'
      },
      { status: 500 }
    );
  }
}

async function sendAdminNotification(applicationId: string, data: any) {
  try {
    await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/email/admin-notification`, {
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

async function sendApplicantConfirmation(email: string, applicationId: string) {
  try {
    await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/email/application-confirmation`, {
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

async function auditLog(action: string, resourceId: string, details: any) {
  try {
    // Dynamically import TempStorage for audit logs too
    const { TempStorage } = await import('@/lib/redis/temp-storage');
    
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