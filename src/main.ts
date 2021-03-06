import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { validationPipeOptions } from './Utilities/exceptionHandler/validation/validationPipeOptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
