import Joi from 'joi';

export default (input) => {
  const schema = Joi.object().keys({
    names: Joi.string().min(2).max(60).required(),
    dateOfBirth: Joi.date().required(),
    class: Joi.string().min(2).max(10).required(),
    school: Joi.string().min(2).max(60).required(),
    image: Joi.string().min(2).max(60).optional(),
  });
  return Joi.validate(input, schema, { abortEarly: false });
};
