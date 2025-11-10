// import { NextRequest, NextResponse } from 'next/server';
// import { ApplicationServiceServer } from '@/lib/api/application-service-server';

// export async function POST(request: NextRequest) {
//   try {
//     const { draftData, draftId } = await request.json();
    
//     const result = await ApplicationServiceServer.saveDraft(draftData, draftId);
    
//     return NextResponse.json(result);
//   } catch (error) {
//     console.error('Draft save error:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: 'Failed to save draft'
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const draftId = searchParams.get('draftId');

//     if (!draftId) {
//       return NextResponse.json(
//         { success: false, error: 'Draft ID is required' },
//         { status: 400 }
//       );
//     }

//     const result = await ApplicationServiceServer.loadDraft(draftId);
    
//     return NextResponse.json(result);
//   } catch (error) {
//     console.error('Draft load error:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: 'Failed to load draft'
//       },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { draftData, draftId } = await request.json();
    
    // Dynamically import server-only modules
    const { SecureDataHandler } = await import('@/lib/security/encryption');
    const { TempStorage } = await import('@/lib/redis/temp-storage');

    const finalDraftId = await SecureDataHandler.storeTemporaryApplication(
      draftData, 
      168, // 7 days expiry for drafts
      'draft'
    );

    await auditLog('draft_saved', finalDraftId, {
      hasPersonalInfo: !!draftData.personalInfo,
      hasBusinessInfo: !!draftData.businessInfo,
      hasLoanDetails: !!draftData.loanDetails
    });

    return NextResponse.json({
      success: true,
      draftId: finalDraftId,
      message: 'Draft saved successfully'
    });

  } catch (error) {
    console.error('Draft save error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save draft'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const draftId = searchParams.get('draftId');

    if (!draftId) {
      return NextResponse.json(
        { success: false, error: 'Draft ID is required' },
        { status: 400 }
      );
    }

    // Dynamically import server-only modules
    const { SecureDataHandler } = await import('@/lib/security/encryption');
    const { TempStorage } = await import('@/lib/redis/temp-storage');

    const draftData = await SecureDataHandler.retrieveApplication(draftId, 'draft');
    
    if (!draftData) {
      return NextResponse.json(
        { success: false, error: 'Draft not found or expired' },
        { status: 404 }
      );
    }

    await auditLog('draft_loaded', draftId, { loaded: true });

    return NextResponse.json({
      success: true,
      data: draftData
    });

  } catch (error) {
    console.error('Draft load error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load draft'
      },
      { status: 500 }
    );
  }
}

async function auditLog(action: string, resourceId: string, details: any) {
  try {
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
