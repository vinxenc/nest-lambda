import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApigatewayStack } from './stacks/apigateway-stack';
import { getConstructId } from '../utils';
import { StackName } from '../constants/enum';

export class ResourcesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new ApigatewayStack(this, getConstructId(StackName.APIGATEWAY));
  }
}
