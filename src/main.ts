import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseRepository } from './database/database.repository';
import { INestApplication } from '@nestjs/common';

let app: INestApplication;

async function bootstrap() {
  app = await NestFactory.create(AppModule);

  const databaseService = app.get(DatabaseRepository);
  databaseService.innitData(app);

  await app.listen(3000);
}

bootstrap();
