import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import { validationSchema } from './envValidationSchema';

export class ConfigOptions implements ConfigModuleOptions {
  isGlobal = true;
  envFilePath = ['.env.dev.dev', '.env.dev.test'];
  ignoreEnvFile = process.env.NODE_ENV === 'prod';
  validationSchema = validationSchema;
}
