import Joi from "joi";

const env: Joi.ObjectSchema<any> = Joi.object({
    AMQP_URL: Joi.string().required(),
    PORT: Joi.string().allow(''),
    ALLOWED_ORIGINS: Joi.string().allow(''),
    NODE_ENV: Joi.string().allow(''),
    REST_API_KEY: Joi.string().allow(''),
});

export default env;