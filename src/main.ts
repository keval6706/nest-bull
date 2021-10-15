import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
    .setTitle('Api Document')
    .setDescription('Api Document Description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(3000);
}
bootstrap();
