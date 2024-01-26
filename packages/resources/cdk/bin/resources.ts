#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ResourcesStack } from '../lib/resources-stack';
import { env } from '../../env';
import { getConstructId } from '../utils';

const app = new cdk.App();

const resourcesId = getConstructId('Resources');

new ResourcesStack(app, resourcesId, {
  env: { account: env.CDK_DEFAULT_ACCOUNT, region: env.CDK_DEFAULT_REGION },
  synthesizer: new cdk.DefaultStackSynthesizer({ qualifier: env.QUALIFIER }),
  tags: {
    resourcesId,
  },
});
