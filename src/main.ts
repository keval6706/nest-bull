import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './exceptions/http-exception-filter.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = +app.get(ConfigService).get('PORT') || 4000;

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

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Api Document')
    .setDescription('Api Document Description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, swaggerDocument);

  // Error Handler
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port, () => {
    console.log(`################################################
  🛡️  Server listening on port: ${port} 🛡️
################################################`);
  });
}
bootstrap();
