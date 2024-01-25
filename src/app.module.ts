import { Logger, Module } from '@nestjs/common';
import { PrismaModule, QueryInfo, loggingMiddleware } from 'nestjs-prisma';
import { ConfigModule } from '@nestjs/config';
import config from './common/configs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      cache: true,
    }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log',
            logMessage: (query: QueryInfo) =>
              `[Prisma Query] ${query.model}.${query.action} +${query.executionTime}ms`,
          }),
        ],
      },
    }),
    AuthModule,
  ],
})
export class AppModule {}
