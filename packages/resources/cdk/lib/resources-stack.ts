import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApigatewayStack } from './stacks/apigateway-stack';

export class ResourcesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const apigatewayStack = new ApigatewayStack(this, 'ApigatewayStack');
  }
}
