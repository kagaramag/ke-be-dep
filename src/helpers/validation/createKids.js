import Joi from 'joi';

export default (input) => {
  const schema = Joi.object().keys({
    names: Joi.string().min(2).max(60).required(),
    age: Joi.number().required(),
    class: Joi.string().min(2).max(10).required(),
    school: Joi.string().min(2).max(60).required(),
    image: Joi.string().min(2).max(60).optional(),
    subject: Joi.array().optional(),
  });
  return Joi.validate(input, schema, { abortEarly: false });
};
