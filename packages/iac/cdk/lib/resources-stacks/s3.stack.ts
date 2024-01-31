import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { CfnOutput } from 'aws-cdk-lib';
import { getConstructId } from '../../utils';
import { ResourceName } from '../../constants/enum';

export class S3Stack extends Construct {
  public s3Bucket: Bucket;

  public constructor(scope: Construct, id: string) {
    super(scope, id);
    const constructId = getConstructId(ResourceName.BUCKET);
    this.s3Bucket = new Bucket(this, constructId, {
      bucketName: constructId,
    });

    new CfnOutput(this, 's3Bucket', { value: this.s3Bucket.bucketName });
  }
}
