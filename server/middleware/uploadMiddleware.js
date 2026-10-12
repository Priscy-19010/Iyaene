const multer = require('multer');

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp'];
const NOT_AN_IMAGE = 'Only image files (jpg, png, webp) are allowed';

// Step 1: multer reads the upload into memory (req.file.buffer) instead of writing it to disk.
// The cheap check here only looks at what the browser CLAIMS the file is.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_BYTES, files: 1 },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIME.includes(file.mimetype)) return cb(null, true);
    return cb(new Error(NOT_AN_IMAGE));
  },
});

// Step 2: look at the file's actual first bytes ("magic numbers"). Every real image format
// starts with a fixed signature, and the filename and mimetype can be faked but these can't
// without breaking the image. Returns the TRUE type, or null if it isn't a supported image.
const detectType = (buf) => {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'jpg';
  if (
    buf.length >= 8 &&
    buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  ) {
    return 'png';
  }
  if (buf.length >= 12 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    return 'webp';
  }
  return null;
};

const verifyImage = (req, res, next) => {
  if (!req.file) return next(); // the controller answers "No file uploaded"

  const type = detectType(req.file.buffer);
  if (!type) return next(new Error(NOT_AN_IMAGE)); // errorHandler turns this into a 400

  // The saved file's extension comes from what the file really is, never from the user's filename
  req.file.detectedExt = type;
  next();
};

exports.uploadSingleImage = [upload.single('image'), verifyImage];
exports.detectType = detectType;