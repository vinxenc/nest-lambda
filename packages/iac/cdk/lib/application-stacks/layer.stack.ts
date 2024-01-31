import { Code, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import * as path from 'path';
import { getConstructId } from '../../utils';
import { ResourceName } from '../../constants/enum';

export class LayerStack extends Construct {
  public layerModules: LayerVersion;

  public constructor(scope: Construct, id: string) {
    super(scope, id);

    const constructId = getConstructId(ResourceName.LAYER_MODULES);
    this.layerModules = new LayerVersion(this, constructId, {
      layerVersionName: constructId,
      compatibleRuntimes: [Runtime.NODEJS_18_X],
      code: Code.fromAsset(path.join(__dirname, '../../../../layers/modules/nodejs/'), {
        bundling: {
          user: 'root',
          image: Runtime.NODEJS_18_X.bundlingImage,
          command: [
            'bash',
            '-xc',
            [
              'export npm_config_update_notifier=false',
              'export npm_config_cache=$(mktemp -d)',
              'cd $(mktemp -d)',
              'cp -v /asset-input/package.json .',
              'npm i --no-scripts --no-bin-links --only=prod',
              'mkdir -p /asset-output/nodejs',
              'cp -r ./node_modules /asset-output/nodejs',
              'cp -v ./package-lock.json /asset-output/nodejs',
            ].join('&&'),
          ],
        },
      }),
    });
  }
}
