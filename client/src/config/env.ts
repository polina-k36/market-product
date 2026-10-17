const apiUrl = import.meta.env.VITE_API_URL;
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const s3Url = import.meta.env.VITE_S3_PUBLIC_URL;

if (!apiUrl) {
  throw new Error('VITE_API_URL is not defined');
}

if (!googleClientId) {
  throw new Error('VITE_GOOGLE_CLIENT_ID is not defined');
}

if (!s3Url) {
  throw new Error('VITE_S3_PUBLIC_URL is not defined');
}

export const env = {
  apiUrl,
  googleClientId,
  s3Url,
};
