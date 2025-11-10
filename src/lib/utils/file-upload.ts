export async function uploadFile(file: File, documentType: string): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('documentType', documentType);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || `Failed to upload ${documentType}`);
  }

  return result.fileUrl;
}

export async function uploadAllFiles(documents: any): Promise<Record<string, string>> {
  const uploads: Record<string, string> = {};
  const uploadPromises = [];

  for (const [docType, file] of Object.entries(documents)) {
    if (file && file instanceof File) {
      uploadPromises.push(
        uploadFile(file as File, docType)
          .then(fileUrl => { uploads[docType] = fileUrl; })
          .catch(error => { 
            console.error(`Failed to upload ${docType}:`, error);
            throw error;
          })
      );
    }
  }

  await Promise.all(uploadPromises);
  return uploads;
}