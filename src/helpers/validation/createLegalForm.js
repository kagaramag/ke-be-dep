import Joi from "joi";

export default input => {
  const schema = Joi.object().keys({
    experience: Joi.string().optional(),
    language: Joi.string().optional()
  });
  return Joi.validate(input, schema, { abortEarly: false });
};
