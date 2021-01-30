import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import { validationSchema } from './envValidationSchema';

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  cache: true,
  envFilePath: `.env.${process.env.NODE_ENV}`,
  ignoreEnvFile: process.env.NODE_ENV === 'prod',
  validationSchema,
};
