import Joi from 'joi';

export default (input) => {
  const schema = Joi.object().keys({
    body: Joi.string()
      .min(3)
      .required(),
    coverUrl: Joi.any().optional(),
    tagList: Joi.array()
      .min(2)
      .max(255)
      .optional(),
    userId: Joi.number().optional()
  });
  return Joi.validate(input, schema, { abortEarly: false });
};
