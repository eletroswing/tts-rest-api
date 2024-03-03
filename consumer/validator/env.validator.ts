import Joi from "joi";

const env: Joi.ObjectSchema<any> = Joi.object({
    AMQP_URL: Joi.string().required(),
    IA_URL: Joi.string().required(),
    IA_PASS: Joi.string().required()
});

export default env;