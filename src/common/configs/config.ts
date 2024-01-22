import type { Config } from './config.interface';

const config: Config = {
  nest: {
    port: parseInt(process.env.PORT),
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Nest Ecommerce',
    description: 'Ecommerce built with NestJS',
    version: '1.0',
    path: 'api',
  },
  security: {
    expiresIn: '2m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
  },
};

export default (): Config => config;
