import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { app_config } from './utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app_config(app);
  await app.listen(3000);
}

(async () => {
  try {
    await bootstrap();
  } catch (err) {
    console.error(err);
  }
})();
