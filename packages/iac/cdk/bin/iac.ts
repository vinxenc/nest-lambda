#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ResourcesStack } from '../lib/resources.stack';
import { env } from '../../env';
import { getConstructId } from '../utils';
import { ApiStack } from '../lib/api.stack';

const resourcesId = getConstructId('resources');
const apiId = getConstructId('api');

const app = new cdk.App();
const props = {
  env: { account: env.CDK_DEFAULT_ACCOUNT, region: env.CDK_DEFAULT_REGION },
  synthesizer: new cdk.DefaultStackSynthesizer({ qualifier: env.QUALIFIER }),
  tags: {
    resourcesId,
  },
};

new ResourcesStack(app, resourcesId, {
  ...props,
  tags: { resourcesId },
});

new ApiStack(app, apiId, {
  ...props,
  tags: { apiId },
});
