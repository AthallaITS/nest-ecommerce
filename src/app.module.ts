import { Logger, Module } from '@nestjs/common';
import { PrismaModule, QueryInfo, loggingMiddleware } from 'nestjs-prisma';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
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
export class AppModule {
  static port: number;
  static apiVersion: string;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get('nest.port');
    AppModule.apiVersion = this.configService.get('nest.apiVersion');
  }
}
