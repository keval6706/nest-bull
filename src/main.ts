import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add Versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Add Helmet
  app.use(helmet());

  // Enable Cors
  app.enableCors();

  // Add Compression
  app.use(compression());

  await app.listen(3000);
}
bootstrap();
