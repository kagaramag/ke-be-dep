import Joi from "joi";

export default input => {
  const schema = Joi.object().keys({
    firstName: Joi.string()
      .min(2)
      .max(45)
      .required()
      .label("First name"),
    gender: Joi.string()
      .min(4)
      .max(45)
      .optional(),
    lastName: Joi.string()
      .min(2)
      .max(45)
      .required()
      .label("Last name"),
    email: Joi.string()
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
    role: Joi.number().optional(),
    permissions: Joi.object().optional()
  });

  return Joi.validate(input, schema, { abortEarly: false });
};
