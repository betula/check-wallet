import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'verbose', 'log'],
  });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  const logger = new Logger();
  logger.verbose(`Server started on http://127.0.0.1:${port}`);

  if (!port) {
    throw new Error('.env error, PORT not specified');
  }

  app.enableCors();

  await app.listen(port);
}
bootstrap();
