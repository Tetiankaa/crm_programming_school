import Joi from 'joi';

const commentValidator = Joi.object({
    text: Joi.string().required().min(1).max(50).messages({
        'string.base': "{#label} should be a type of 'text'",
        'any.required': '{#label} is a required field',
        'string.empty': '{#label} should not be empty',
        'string.min': '{#label} should have a minimum length of {#limit}',
        'string.max': '{#label} should have a maximum length of {#limit}',
    }),
});

export { commentValidator };
