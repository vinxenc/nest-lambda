import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { getConstructId } from '../utils';
import { StackName } from '../constants/enum';
import { S3Stack } from './resources-stacks/s3.stack';

export class ResourcesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new S3Stack(this, getConstructId(StackName.S3_STORAGE));
  }
}
