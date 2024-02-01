import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { Construct } from 'constructs';
import { HttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import modulesPackage from 'nodejs/package.json';
import { getConstructId } from '../utils';
import { StackName } from '../constants/enum';
import { ApigatewayStack } from './application-stacks/apigateway.stack';
import { LayerStack } from './application-stacks/layer.stack';

export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const aigatewayStack = new ApigatewayStack(this, getConstructId(StackName.APIGATEWAY));
    const layerStack = new LayerStack(this, getConstructId(StackName.LAYER));
    // 👇 create get-todos Lambda
    const getTodosLambda = new NodejsFunction(this, 'get-todos', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: path.join(__dirname, '/../../../server/dist/lambda.entrypoint.js'),
      layers: [layerStack.layerModules],
      bundling: {
        // preCompilation: true,
        esbuildArgs: {
          '--resolve-extensions': '.js',
        },
        externalModules: [...Object.keys(modulesPackage.dependencies)],
      },
      memorySize: 512,
    });

    // 👇 add route for GET /todos
    aigatewayStack.httpApi.addRoutes({
      path: '/{api}',
      methods: [HttpMethod.GET],
      integration: new HttpLambdaIntegration('get-todos-integration', getTodosLambda),
    });
  }
}
