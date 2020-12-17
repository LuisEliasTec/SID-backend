import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('SERVER_PORT') || 3000;
  app.enableCors({ origin: 'http://localhost:4200' });
  app.setGlobalPrefix('api/v1');
  await app.listen(port);
}
bootstrap();
