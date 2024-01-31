import { Context, APIGatewayProxyEventV2 } from 'aws-lambda';
import awsLambdaFastify, {
  PromiseHandler,
  LambdaResponse,
} from '@fastify/aws-lambda';
import { bootstrap } from './app';

let proxy: PromiseHandler<unknown, LambdaResponse>;

export const handler = async (
  event: APIGatewayProxyEventV2,
  context: Context,
): Promise<LambdaResponse> => {
  if (!proxy) {
    const app = await bootstrap();

    await app.init();

    const fastifyServer = app.getHttpAdapter().getInstance();

    proxy = awsLambdaFastify(fastifyServer, { decorateRequest: true });
  }

  return proxy(event, context);
  // return await proxy(fastifyServer, event, context);
};
