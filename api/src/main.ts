import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { EnvConfigService } from 'src/env-config/env-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'verbose', 'log'],
  });

  const port = app.get(EnvConfigService).get('PORT');

  const logger = new Logger();
  logger.verbose(`Server started on http://127.0.0.1:${port}`);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(port);
}
bootstrap();
