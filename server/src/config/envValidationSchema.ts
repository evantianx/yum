import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'test', 'prod').default('dev'),
  TYPEORM_CONNECTION: Joi.string().valid().required(),
  TYPEORM_HOST: Joi.string().required(),
  TYPEORM_PORT: Joi.number().required(),
  TYPEORM_USERNAME: Joi.string().required(),
  TYPEORM_PASSWORD: Joi.string().required(),
  TYPEORM_DATABASE: Joi.string().required(),
  TYPEORM_SYNCHRONIZE: Joi.boolean().required(),
  TYPEORM_LOGGING: Joi.boolean().required(),
});
