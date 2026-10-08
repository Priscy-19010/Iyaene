const path = require('path');

// 1. Load .env (if the file exists). Real environment variables set by your host always win.
require('dotenv').config({ path: path.join(__dirname, '..', '.env'), quiet: true });

const DEV_ORIGINS = ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'];

// 2. Check every setting the server needs and collect ALL problems at once
const parseEnv = (source) => {
  const errors = [];
  const nodeEnv = source.NODE_ENV || 'development';
  const isProduction = nodeEnv === 'production';

  const mongoUri = (source.MONGODB_URI || '').trim();
  if (!mongoUri) errors.push('MONGODB_URI is required');
  else if (!/^mongodb(\+srv)?:\/\//.test(mongoUri)) {
    errors.push('MONGODB_URI must start with mongodb:// or mongodb+srv://');
  }

  const jwtSecret = source.JWT_SECRET || '';
  if (!jwtSecret) errors.push('JWT_SECRET is required');
  else if (jwtSecret.length < 32) {
    errors.push(
      'JWT_SECRET must be at least 32 characters. Generate one with: ' +
        `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`
    );
  }

  const rawPort = (source.PORT || '5000').trim();
  const port = Number(rawPort);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    errors.push(`PORT must be a whole number between 1 and 65535 (got "${rawPort}")`);
  }

  // Frontend addresses allowed to call this API from a browser (CORS)
  let clientUrls = (source.CLIENT_URLS || '')
    .split(',')
    .map((url) => url.trim().replace(/\/+$/, '')) // "https://x.com/" would never match "https://x.com"
    .filter(Boolean);
  if (clientUrls.length === 0) {
    if (isProduction) errors.push('CLIENT_URLS is required in production (comma-separated frontend URLs)');
    else clientUrls = DEV_ORIGINS;
  }
  for (const url of clientUrls) {
    if (!/^https?:\/\/[^\s/]+$/.test(url)) {
      errors.push(`CLIENT_URLS contains an invalid origin: "${url}" (use e.g. https://myportfolio.com)`);
    }
  }

  // How many proxies sit between the internet and this server (0 = none)
  const rawProxy = (source.TRUST_PROXY || '0').trim();
  const trustProxy = Number(rawProxy);
  if (!Number.isInteger(trustProxy) || trustProxy < 0 || trustProxy > 10) {
    errors.push('TRUST_PROXY must be a whole number from 0 to 10');
  }

    // Where uploaded images are kept: "local" (the uploads folder) or "cloudinary" (survives redeploys)
  const storageDriver = (source.STORAGE_DRIVER || 'local').trim();
  if (!['local', 'cloudinary'].includes(storageDriver)) {
    errors.push('STORAGE_DRIVER must be "local" or "cloudinary"');
  }

  // Public address of THIS API. Image URLs are built from it (never from the request's Host header).
  let publicUrl = (source.PUBLIC_URL || '').trim().replace(/\/+$/, '');
  if (!publicUrl) {
    if (isProduction && storageDriver === 'local') {
      errors.push('PUBLIC_URL is required in production when STORAGE_DRIVER=local (e.g. https://api.myportfolio.com)');
    } else {
      publicUrl = `http://localhost:${port}`;
    }
  } else if (!/^https?:\/\/[^\s/]+$/.test(publicUrl)) {
    errors.push(`PUBLIC_URL is not a valid origin: "${publicUrl}" (use e.g. https://api.myportfolio.com)`);
  }

  const cloudinary = {
    cloudName: (source.CLOUDINARY_CLOUD_NAME || '').trim(),
    apiKey: (source.CLOUDINARY_API_KEY || '').trim(),
    apiSecret: (source.CLOUDINARY_API_SECRET || '').trim(),
  };
  if (storageDriver === 'cloudinary') {
    if (!cloudinary.cloudName) errors.push('CLOUDINARY_CLOUD_NAME is required when STORAGE_DRIVER=cloudinary');
    if (!cloudinary.apiKey) errors.push('CLOUDINARY_API_KEY is required when STORAGE_DRIVER=cloudinary');
    if (!cloudinary.apiSecret) errors.push('CLOUDINARY_API_SECRET is required when STORAGE_DRIVER=cloudinary');
  }

  // Email notifications (Resend). Optional: with no RESEND_API_KEY the server still works, it just sends no emails.
  const resendApiKey = (source.RESEND_API_KEY || '').trim();
  const emailFrom = (source.EMAIL_FROM || 'Iyaene <onboarding@resend.dev>').trim();
  const notifyEmail = (source.NOTIFY_EMAIL || '').trim();
  if (resendApiKey) {
    if (!notifyEmail) errors.push('NOTIFY_EMAIL is required when RESEND_API_KEY is set (the inbox that receives form notifications)');
    else if (!/^[^\s@,;<>]+@[^\s@,;<>]+\.[^\s@,;<>]+$/.test(notifyEmail)) {
      errors.push(`NOTIFY_EMAIL is not a valid email address: "${notifyEmail}"`);
    }
    if (!/^([^<>\r\n]+<[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+>|[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+)$/.test(emailFrom)) {
      errors.push('EMAIL_FROM must look like "Iyaene <hello@yourdomain.com>" or "hello@yourdomain.com"');
    }
  }

  return {
    errors,
    config: {
      nodeEnv,
      isProduction,
      port,
      mongoUri,
      clientUrls,
      trustProxy,
      useGoogleDns: source.USE_GOOGLE_DNS === 'true',
      storageDriver,
      publicUrl,
      cloudinary,
      email: { enabled: Boolean(resendApiKey), apiKey: resendApiKey, from: emailFrom, notifyTo: notifyEmail },
    },
  };
};

const { errors, config } = parseEnv(process.env);

// 3. Fail fast: refuse to start with a broken configuration
if (errors.length) {
  console.error(
    '\nInvalid environment configuration:\n' +
      errors.map((e) => `  - ${e}`).join('\n') +
      '\n\nFix your .env file (see .env.example) and restart.\n'
  );
  process.exit(1);
}

module.exports = Object.freeze(config);