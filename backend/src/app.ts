import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import authRoutes from './routes/auth.routes';
import industryRoutes from './routes/industry.routes';
import templateRoutes from './routes/template.routes';
import landingPageRoutes from './routes/landing-page.routes';
import uploadRoutes from './routes/upload.routes';
import { errorHandler } from './middlewares/error';

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true
  })
);
app.use(morgan('dev'));
app.use(express.json({ limit: '2mb' }));

app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 500
  })
);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/auth', authRoutes);
app.use('/api/industries', industryRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/landing-pages', landingPageRoutes);
app.use('/api/uploads', uploadRoutes);

app.use(errorHandler);
