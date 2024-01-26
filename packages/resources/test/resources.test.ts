import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { IConstruct } from 'constructs';
import * as Resources from '../cdk/lib/resources-stack';
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
    app = new cdk.App(); // IConstruct
    stack = new Resources.ResourcesStack(app, 'ResourcesStack');
    template = Template.fromStack(stack);
  });

  it('API gateway initial', () => {
    template.hasResourceProperties('AWS::ApiGatewayV2::Api', {
      CorsConfiguration: {
        AllowCredentials: true,
        AllowHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key'],
        AllowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        AllowOrigins: ['http://localhost:3000'],
      },
      Description: 'HTTP API',
      Name: getConstructId(ResourceName.HTTP_API),
      ProtocolType: 'HTTP',
    });
  });
});
