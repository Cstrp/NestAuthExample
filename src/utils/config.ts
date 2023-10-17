import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { LoggerErrorInterceptor, Params } from 'nestjs-pino';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Request } from 'express';
import { ReqId } from 'pino-http';

const passUrl = new Set(['/health', '/metrics']);

const app_config = (app: INestApplication) => {
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(/\s*,\s*/) ?? '*',
    credentials: true,
    exposedHeaders: ['Authorization'],
  });
  app.enableShutdownHooks();

  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );
  app.use(cookieParser(process.env.APP_SECRET));

  const docBuilder = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API for the authentication service use jwt')
    .setVersion('1.0')
    .build();

  const doc = SwaggerModule.createDocument(app, docBuilder);
  SwaggerModule.setup('/docs', app, doc);
};

const logger_config: Params = {
  pinoHttp: {
    quietReqLogger: true,
    transport: {
      target: 'pino-pretty',
      dedupe: true,
      options: {
        colorize: true,
        levelFirst: true,
        translateTime: true,
      },
    },
    level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    genReqId: (req): ReqId => (<Request>req).header('X-Request-Id')!,
    autoLogging: {
      ignore: (req: Request) => passUrl.has(req.originalUrl),
    },
  },
};

export { app_config, logger_config };
