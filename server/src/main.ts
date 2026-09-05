import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import cookieParser from 'cookie-parser';
import * as crypto from 'crypto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Сервер запущен на порту - ${process.env.PORT ?? 3000}`);
  });
}
await bootstrap();
