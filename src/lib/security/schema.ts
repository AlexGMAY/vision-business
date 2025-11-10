import { z } from 'zod';

// File Metadata Schema (for API submission)
export const fileMetadataSchema = z.object({
  name: z.string().min(1, 'File name is required'),
  size: z.number().min(1, 'File size must be greater than 0'),
  type: z.string().min(1, 'File type is required'),
  lastModified: z.number(),
  data: z.string().optional(), // base64 data if needed
});

// File Upload Reference Schema (for stored files)
export const fileUploadSchema = z.object({
  fileUrl: z.string().url().optional(),
  fileName: z.string().optional(),
  uploadedAt: z.string().datetime().optional(),
});

// Personal Information Schema
export const personalInfoSchema = z.object({
  // Identity
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  
  // Address
  address: z.object({
    street: z.string().min(5, 'Please enter a complete street address'),
    city: z.string().min(2, 'Please enter a valid city'),
    postalCode: z.string().min(4, 'Please enter a valid postal code'),
    country: z.string().min(2, 'Please select a country')
  }),
  
  // Identification
  idType: z.enum(['passport', 'national_id', 'drivers_license']),
  idNumber: z.string().min(5, 'Please enter a valid ID number'),
  
  // Employment
  employmentStatus: z.enum(['employed', 'self_employed', 'business_owner', 'student', 'unemployed']),
  monthlyIncome: z.number().min(0, 'Income cannot be negative'),
  occupation: z.string().min(2, 'Please enter your occupation')
});

// Business Information Schema
export const businessInfoSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  businessType: z.enum(['sole_proprietorship', 'llc', 'corporation', 'partnership', 'non_profit']),
  registrationNumber: z.string().min(5, 'Please enter a valid registration number'),
  businessAge: z.number().min(0, 'Business age cannot be negative'),
  annualRevenue: z.number().min(0, 'Revenue cannot be negative'),
  employeeCount: z.number().min(0, 'Employee count cannot be negative'),
  industry: z.string().min(2, 'Please select an industry'),
  website: z.string().url().optional().or(z.literal(''))
});

// Loan Details Schema
export const loanDetailsSchema = z.object({
  loanType: z.enum(['personal', 'business', 'emergency', 'equipment', 'startup', 'growth']),
  loanAmount: z.number().min(1000, 'Minimum loan amount is $1,000').max(100000, 'Maximum loan amount is $100,000'),
  loanPurpose: z.string().min(10, 'Please provide a detailed loan purpose').max(500),
  loanTerm: z.number().min(6, 'Minimum term is 6 months').max(84, 'Maximum term is 84 months'),
  collateral: z.object({
    hasCollateral: z.boolean(),
    collateralType: z.string().optional(),
    collateralValue: z.number().optional()
  }),
  preferredDisbursement: z.enum(['bank_transfer', 'mobile_money', 'check'])
});

// Document Schema for Client-Side Validation
export const documentClientSchema = z.object({
  identityDocument: z.instanceof(File)
    .refine(file => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine(file => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      return allowedTypes.includes(file.type);
    }, 'Only JPEG, PNG, and PDF files are allowed'),
  
  proofOfIncome: z.instanceof(File)
    .refine(file => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine(file => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      return allowedTypes.includes(file.type);
    }, 'Only JPEG, PNG, and PDF files are allowed'),
  
  proofOfAddress: z.instanceof(File)
    .refine(file => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine(file => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      return allowedTypes.includes(file.type);
    }, 'Only JPEG, PNG, and PDF files are allowed'),
  
  additionalDocuments: z.array(z.instanceof(File)).optional()
});

// Document Schema for API Submission (with file metadata)
export const documentApiSchema = z.object({
  identityDocument: fileMetadataSchema,
  proofOfIncome: fileMetadataSchema,
  proofOfAddress: fileMetadataSchema,
  additionalDocuments: z.array(fileMetadataSchema).optional(),
  
  // Uploaded file references (populated after file upload)
  fileUploads: z.object({
    identityDocument: z.string().optional(), // file URL or path
    proofOfIncome: z.string().optional(),
    proofOfAddress: z.string().optional(),
    additionalDocuments: z.array(z.string()).optional(),
  }).optional()
});

// Complete Application Schema for Client-Side
export const applicationClientSchema = z.object({
  personalInfo: personalInfoSchema,
  businessInfo: businessInfoSchema.optional(),
  loanDetails: loanDetailsSchema,
  documents: documentClientSchema,
  termsAccepted: z.boolean()
    .refine(val => val === true, 'You must accept the terms and conditions')
    .optional()
    .default(false), // Add default value
  privacyAccepted: z.boolean()
    .refine(val => val === true, 'You must accept the privacy policy')
    .optional()
    .default(false) // Add default value
});


// Complete Application Schema for API Submission
export const applicationApiSchema = z.object({
  personalInfo: personalInfoSchema,
  businessInfo: businessInfoSchema.optional(),
  loanDetails: loanDetailsSchema,
  documents: documentApiSchema,
  fileUploads: z.object({
    identityDocument: z.string().optional(),
    proofOfIncome: z.string().optional(),
    proofOfAddress: z.string().optional(),
    additionalDocuments: z.array(z.string()).optional(),
  }).optional(),
  termsAccepted: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
  privacyAccepted: z.boolean().refine(val => val === true, 'You must accept the privacy policy')
});

// Export types
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type BusinessInfo = z.infer<typeof businessInfoSchema>;
export type LoanDetails = z.infer<typeof loanDetailsSchema>;
export type DocumentsClient = z.infer<typeof documentClientSchema>;
export type DocumentsApi = z.infer<typeof documentApiSchema>;
export type ApplicationDataClient = z.infer<typeof applicationClientSchema>;
export type ApplicationDataApi = z.infer<typeof applicationApiSchema>;
export type FileMetadata = z.infer<typeof fileMetadataSchema>;
export type FileUpload = z.infer<typeof fileUploadSchema>;

// Helper function to convert File to FileMetadata
export function fileToMetadata(file: File): FileMetadata {
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
  };
}

// Helper function to convert files to metadata for API submission
export function prepareDocumentsForApi(documents: DocumentsClient): DocumentsApi {
  return {
    identityDocument: fileToMetadata(documents.identityDocument),
    proofOfIncome: fileToMetadata(documents.proofOfIncome),
    proofOfAddress: fileToMetadata(documents.proofOfAddress),
    additionalDocuments: documents.additionalDocuments?.map(fileToMetadata),
  };
}

// Safe validation function for client-side forms (with defaults)
export function validateClientApplication(data: any): ApplicationDataClient {
  // Ensure required boolean fields have values
  const dataWithDefaults = {
    ...data,
    termsAccepted: data.termsAccepted ?? false,
    privacyAccepted: data.privacyAccepted ?? false
  };
  
  return applicationClientSchema.parse(dataWithDefaults);
}

// Safe validation that doesn't throw
export function safeValidateClientApplication(data: any) {
  const dataWithDefaults = {
    ...data,
    termsAccepted: data.termsAccepted ?? false,
    privacyAccepted: data.privacyAccepted ?? false
  };
  
  return applicationClientSchema.safeParse(dataWithDefaults);
}


// ============================================================================
// BACKWARD COMPATIBILITY EXPORTS
// ============================================================================

// Keep the original exports for existing code
export const documentSchema = documentClientSchema;
export const applicationSchema = applicationClientSchema;

// Re-export original types
export type Documents = DocumentsClient;
export type ApplicationData = ApplicationDataClient;
