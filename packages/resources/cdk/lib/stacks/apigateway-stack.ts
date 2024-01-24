import { CorsHttpMethod, HttpApi } from "aws-cdk-lib/aws-apigatewayv2";
import { Construct } from "constructs";

export class ApigatewayStack extends Construct {
  public httpApi: HttpApi
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // 👇 create our HTTP Api
    this.httpApi = new HttpApi(this, 'http-api-example', {
      description: 'HTTP API example',
      corsPreflight: {
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
        ],
        allowMethods: [
          CorsHttpMethod.OPTIONS,
          CorsHttpMethod.GET,
          CorsHttpMethod.POST,
          CorsHttpMethod.PUT,
          CorsHttpMethod.PATCH,
          CorsHttpMethod.DELETE,
        ],
        allowCredentials: true,
        allowOrigins: ['http://localhost:3000'],
      },
    });
  }
}