import { app } from './app';
import { connectDB } from './config/db';
import { env } from './config/env';

const bootstrap = async (): Promise<void> => {
  await connectDB();
  app.listen(env.PORT, () => {
    console.log(`Backend running on http://localhost:${env.PORT}`);
  });
};

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
