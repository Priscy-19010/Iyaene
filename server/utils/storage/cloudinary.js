const env = require('../../config/env');
const { escapeRegex } = require('../sanitize');
// Only loaded when STORAGE_DRIVER=cloudinary (needs: npm install cloudinary)
const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
  cloud_name: env.cloudinary.cloudName,
  api_key: env.cloudinary.apiKey,
  api_secret: env.cloudinary.apiSecret,
  secure: true,
});

const FOLDER = 'portfolio';

// Uploads the image to Cloudinary and returns its https URL
exports.saveImage = (file) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: FOLDER, resource_type: 'image', allowed_formats: ['jpg', 'png', 'webp'] },
      (err, result) => (err ? reject(err) : resolve(result.secure_url))
    );
    stream.end(file.buffer);
  });

// https://res.cloudinary.com/<cloud>/image/upload/v123/portfolio/abc.png  ->  public id "portfolio/abc"
// Only deletes images that live in OUR cloud and OUR folder. Returns true if one was deleted.
exports.deleteImage = async (url) => {
  if (typeof url !== 'string' || !url) return false;

  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (parsed.hostname !== 'res.cloudinary.com') return false;

  const pattern = new RegExp(
    `^/${escapeRegex(env.cloudinary.cloudName)}/image/upload/(?:v\\d+/)?(${FOLDER}/[\\w-]+)\\.\\w+$`
  );
  const match = parsed.pathname.match(pattern);
  if (!match) return false;

  const result = await cloudinary.uploader.destroy(match[1], { resource_type: 'image' });
  return result.result === 'ok';
};