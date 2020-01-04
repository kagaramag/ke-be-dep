import Joi from 'joi';

export default (input) => {
  const schema = Joi.object().keys({
    firstName: Joi.string()
      .min(2)
      .max(45)
      .required()
      .label('First name'),
    gender: Joi.string()
      .valid(['male', 'female'])
      .required()
      .label('Gender'),
    lastName: Joi.string()
      .min(2)
      .max(45)
      .required()
      .label('Last name'),
    email: Joi.string()
      .email()
      .min(5)
      .max(100)
      .required(),
    bio: Joi.string()
      .min(5)
      .optional(),
    password: Joi.string()
      .min(8)
      .max(100)
      .required(),
    role: Joi.number()
      .valid([1, 2, 3, 4, 5])
      .optional(),
    permissions: Joi.object().optional()
  });

  return Joi.validate(input, schema, { abortEarly: false });
};
