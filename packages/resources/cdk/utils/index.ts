import { env } from '../../env';

export const getConstructId = (name: string): string =>
  `${env.STAGE_NAME}-${env.PROJECT_NAME}-${name}`.toLocaleLowerCase();
