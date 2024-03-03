import Joi from "joi";
import { allowedVoices, defaultVoice } from "../constants";

const tts: Joi.ObjectSchema<any> = Joi.object({
    text: Joi.string().min(1).max(200).required().messages({
        "string.base": "O campo 'text' deve ser uma string.",
        "string.empty": "O campo 'text' não pode estar vazio.",
        "string.min": "O campo 'text' deve ter pelo menos {#limit} caracteres.",
        "string.max": "O campo 'text' não pode ter mais de {#limit} caracteres.",
        "any.required": "O campo 'text' é obrigatório."
    }),
    voice: Joi.string().valid(...allowedVoices).default(defaultVoice).messages({
        "string.empty": "O campo 'voice' não pode estar vazio.",
        "any.only": `O campo 'voice' podem ser: ${allowedVoices.join(", ")}.`
    }),
    webhook: Joi.string().uri().required().messages({
        "string.uri": "O campo 'webhook' deve ser uma URL válida.",
        "any.required": "O campo 'webhook' é obrigatório."
    }),
    headers: Joi.object().optional().pattern(
        Joi.string(),
        Joi.any()
    ).messages({
        "object.base": "O campo 'headers' deve ser um objeto.",
        "object.pattern": "O objeto 'headers' deve conter chaves de string e valores de qualquer tipo."
    }),
    metadata: Joi.any().optional(),
});

export default tts;