import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastify, { FastifyInstance } from 'fastify';
import { AppModule } from './app.module';

export async function bootstrap(): Promise<NestFastifyApplication> {
  const instance: FastifyInstance = fastify({});
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(instance),
    {
      snapshot: true,
    },
  );
  // Enable cors
  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    exposedHeaders: '*',
    credentials: false,
    methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
  });

  // Set the prefix as necessary
  app.setGlobalPrefix('api');

  // await app.init();

  return app;
}
