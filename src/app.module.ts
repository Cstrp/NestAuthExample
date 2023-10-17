import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { logger_config } from './utils';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthenticationModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_ACCESS_TOKEN_SECRET'),
      }),
    }),
    LoggerModule.forRoot(logger_config),
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
