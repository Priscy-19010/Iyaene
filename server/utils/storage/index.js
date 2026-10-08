const env = require('../../config/env');

// Controllers only ever call storage.saveImage(file) and storage.deleteImage(url).
// Which driver does the work is decided by STORAGE_DRIVER in .env.
module.exports = env.storageDriver === 'cloudinary' ? require('./cloudinary') : require('./local');