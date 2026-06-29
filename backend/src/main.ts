import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors({ origin: process.env.FRONTEND_URL ?? '*' });
  app.setGlobalPrefix('api');

  // Swagger / OpenAPI UI at http://localhost:<port>/docs
  const config = new DocumentBuilder()
    .setTitle('LLM Chatbot API')
    .setDescription('Multi-tenant RAG customer-support chatbot')
    .setVersion('0.1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`Backend running on http://localhost:${port}/api`);
  // eslint-disable-next-line no-console
  console.log(`Swagger docs on http://localhost:${port}/docs`);
}
bootstrap();
