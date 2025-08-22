import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Dominios permitidos:
  // - Desarrollo local (Angular)
  // - Front en Vercel (prod)
  // - Cualquier preview de Vercel (*.vercel.app)
  const allowed = new Set<string>([
    'http://localhost:4200',
    'https://coloniafelina-supergatitos.vercel.app',   // <-- URL real de Vercel
    'https://MI-DOMINIO.com'         // <-- si tuviese dominio propio del front
  ]);

  app.enableCors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // Permite llamadas sin origin (p.ej. health)
      try {
        const ok = allowed.has(origin) || origin.endsWith('.vercel.app');
        return cb(ok ? null : new Error('CORS blocked'), ok);
      } catch {
        return cb(new Error('CORS error'), false);
      }
    },
    // Recordatorio: Si en el futuro uso cookies de auth:
    // credentials: true,
  });

  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/public/' });

  const port = Number(process.env.PORT) || 3000;
  // MUY IMPORTANTE en Render/Railway:
  await app.listen(port, '0.0.0.0');
}

bootstrap();
