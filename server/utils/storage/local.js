const fs = require('fs/promises');
const crypto = require('crypto');
const path = require('path');
const env = require('../../config/env');

const UPLOAD_DIR = path.join(__dirname, '..', '..', 'uploads');
// The part before the dot may not contain dots, so "../" tricks can never match
const SAFE_NAME = /^[\w-]+\.(jpe?g|png|webp)$/i;

// Saves the image to the uploads folder and returns its public URL
exports.saveImage = async (file) => {
  // Random name: nothing the user typed ends up in the filename
  const name = `${crypto.randomBytes(16).toString('hex')}.${file.detectedExt}`;
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, name), file.buffer, { flag: 'wx' }); // 'wx' = never overwrite
  return `${env.publicUrl}/uploads/${name}`;
};

// Deletes the file behind a URL, but ONLY if it is one of our own uploaded images.
// Returns true if a file was deleted.
exports.deleteImage = async (url) => {
  if (typeof url !== 'string' || !url) return false;

  let parsed;
  try {
    parsed = new URL(url, env.publicUrl); // also understands "/uploads/abc.png"
  } catch {
    return false;
  }

  // Someone else's image (e.g. https://other-site.com/uploads/abc.png): not ours to delete
  if (parsed.origin !== new URL(env.publicUrl).origin) return false;
  if (!parsed.pathname.startsWith('/uploads/')) return false;

  let name;
  try {
    name = decodeURIComponent(parsed.pathname.slice('/uploads/'.length));
  } catch {
    return false;
  }
  if (!SAFE_NAME.test(name)) return false; // blocks "../", sub-folders, odd names

  try {
    await fs.unlink(path.join(UPLOAD_DIR, name));
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') return false; // already gone
    throw err;
  }
};