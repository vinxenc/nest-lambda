import 'dotenv/config';
import { cleanEnv, str } from 'envalid';

export const env = cleanEnv(process.env, {
  CDK_DEFAULT_ACCOUNT: str(),
  CDK_DEFAULT_REGION: str(),
  STAGE_NAME: str({ choices: ['dev', 'prod', 'stg'] }),
  PROJECT_NAME: str(),
  QUALIFIER: str(),
});
