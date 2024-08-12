import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, '0.0.0.0', () => {
    console.log(`Server running on http://${3000}:${'0.0.0.0'}`);
    // console.log(`Swagger running at http://localhost:${appConfig.port}/docs`);
  });
}
void bootstrap();
