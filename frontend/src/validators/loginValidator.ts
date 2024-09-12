import Joi from 'joi';

const loginValidator = Joi.object({
    email: Joi.string()
        .pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
        .required()
        .messages({
            'string.pattern.base':
                '{#label} must be in a valid format (Example: user@gmail.com)',
            'any.required': '{#label} is a required field',
            'string.empty': '{#label} should not be empty',
        }),
    password: Joi.string().required().messages({
        'any.required': '{#label} is a required field',
        'string.empty': '{#label} should not be empty',
        'string.base': '{#label} should be a type of text',
    }),
});

export { loginValidator };
