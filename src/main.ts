import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseRepository } from './database/database.repository';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

let app: NestExpressApplication;

async function bootstrap() {
  app = await NestFactory.create(AppModule);

  const databaseService = app.get(DatabaseRepository);
  databaseService.innitData(app);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3000);
}

bootstrap();
