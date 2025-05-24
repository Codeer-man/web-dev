import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //global pipe for validate incoming requrest automatically
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //? strip out all properties that are not defined in your DTO class.
      forbidNonWhitelisted: true, //? throw an error if a property is not defined in your DTO class.
      transform: true, //? This will automaically transforms the payload to there object types accourding to there dto classes.
      disableErrorMessages: false, //? Disable detailed validation errors.
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
