import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import metadata from '../metadata';

const title = 'Nest Ecommerce';
const description = 'Ecommerce built with NestJS';

/**
 * Setup swagger in the application
 * @param app {INestApplication}
 */
export const SwaggerConfig = async (
  app: INestApplication,
  apiVersion: string,
) => {
  await SwaggerModule.loadPluginMetadata(metadata);
  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(apiVersion)
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);
};
