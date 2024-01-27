import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import compression from 'compression';
import { SwaggerConfig } from '@config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.enableCors();

  app.use(helmet());
  app.use(compression());

  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  SwaggerConfig(app, AppModule.apiVersion);

  await app.listen(AppModule.port || 3000);
  return AppModule.port || process.env.PORT;
}
bootstrap().then((port: number) => {
  Logger.log(`Application running on port: ${port}`, 'Main');
});
