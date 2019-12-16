import Joi from 'joi';

export default (input) => {
  const schema = Joi.object().keys({
    title: Joi.string()
      .min(10)
      .required(),
    body: Joi.string()
      .min(3)
      .required(),
    category: Joi.string().valid(['blog', 'faqs']).optional(),
    coverUrl: Joi.any().optional(),
    tagList: Joi.array()
      .min(2)
      .max(255)
      .optional()
  });
  return Joi.validate(input, schema, { abortEarly: false });
};
