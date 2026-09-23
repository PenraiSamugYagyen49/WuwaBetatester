import { upload } from '@vercel/blob/client';

const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;

/** Uploads a browser File directly to Vercel Blob and returns its Blob metadata. */
export async function uploadFileToBlob(file, authToken, options = {}) {
  if (!(file instanceof File)) throw new TypeError('A File is required.');
  if (!authToken) throw new Error('Sign in before uploading a file.');
  if (file.size > MAX_UPLOAD_BYTES) throw new Error('Files must be 25 MB or smaller.');

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-').slice(-120) || 'upload';
  const pathname = `uploads/${crypto.randomUUID()}-${safeName}`;

  return upload(pathname, file, {
    access: 'public',
    handleUploadUrl: '/api/uploads',
    clientPayload: JSON.stringify({ authToken }),
    onUploadProgress: options.onUploadProgress,
  });
}
