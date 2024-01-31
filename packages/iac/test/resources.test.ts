import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { IConstruct } from 'constructs';
import * as Resources from '../cdk/lib/resources.stack';
import { getConstructId } from '../cdk/utils';
import { ResourceName } from '../cdk/constants/enum';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/resources-stack.ts
// test('SQS Queue Created', () => {
//   const app = new cdk.App();
//     // WHEN
//   const stack = new Resources.ResourcesStack(app, 'MyTestStack');
//     // THEN
//   const template = Template.fromStack(stack);

//   template.hasResourceProperties('AWS::SQS::Queue', {
//     VisibilityTimeout: 300
//   });
// });

describe('Resources initial', () => {
  let app: IConstruct;
  let stack: cdk.Stack;
  let template: Template;

  beforeAll(() => {
    const resourceContructId = getConstructId('resources');
    app = new cdk.App(); // IConstruct
    stack = new Resources.ResourcesStack(app, resourceContructId);
    template = Template.fromStack(stack);
  });

  it('Bucker initial', () => {
    template.hasResourceProperties('AWS::S3::Bucket', {
      BucketName: getConstructId(ResourceName.BUCKET),
    });
  });
});
