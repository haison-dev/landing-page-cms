import dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcryptjs';
import { connectDB } from '../src/config/db';
import { User } from '../src/models/User';

// Prefer backend/.env when running inside backend, fallback to project root .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '..', '.env') });

const run = async (): Promise<void> => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required');
  }

  await connectDB();

  const existing = await User.findOne({ email: email.toLowerCase() });
  const hash = await bcrypt.hash(password, 10);

  if (existing) {
    existing.password = hash;
    await existing.save();
    console.log('Admin account updated');
  } else {
    await User.create({ email: email.toLowerCase(), password: hash, role: 'admin' });
    console.log('Admin account created');
  }

  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
