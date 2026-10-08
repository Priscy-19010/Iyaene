require('../config/env'); // loads .env and validates it
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

(async () => {
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error('Set ADMIN_EMAIL, and ADMIN_PASSWORD');
  }
  if (ADMIN_PASSWORD.length < 10) throw new Error('ADMIN_PASSWORD must be at least 10 characters');

  await connectDB();

  const email = ADMIN_EMAIL.trim().toLowerCase();
  // Case-insensitive lookup so an older admin saved with capital letters is still found
  const existing = await Admin.findOne({ email }).collation({ locale: 'en', strength: 2 });

  if (!existing) {
    await Admin.create({
      email,
      password: await bcrypt.hash(ADMIN_PASSWORD, 10),
      role: 'admin',
    });
    console.log(`Admin created: ${email}`);
  } else if (existing.role !== 'admin') {
    // Old accounts could have been saved with role "user" (the old default) or no role at all
    await Admin.updateOne({ _id: existing._id }, { role: 'admin' });
    console.log(`${email} already existed with role "${existing.role}" - changed to "admin". Password NOT changed.`);
  } else {
    console.log(`${email} already exists as an admin - nothing changed.`);
  }

  await mongoose.disconnect();
})().catch(async (err) => {
  console.error('Failed:', err.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});