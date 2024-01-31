// import { NestFactory } from '@nestjs/core';
// import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
// import { AppModule } from './app.module';

import { bootstrap } from './app';

async function startLocal(): Promise<void> {
  const fastifyInstance = await bootstrap();
  await fastifyInstance.listen(3000, '0.0.0.0');
}

startLocal();

// async function bootstrap(): Promise<void> {
//   const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
//     snapshot: true,
//   });
//   await app.listen(3000, '0.0.0.0');
// }
// bootstrap();
