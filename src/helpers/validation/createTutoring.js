import Joi from 'joi';

export default (input) => {
  const schema = Joi.object().keys({
    tutorId: Joi.number().required(),
    tuteeId: Joi.number().required()
  });
  return Joi.validate(input, schema, { abortEarly: false });
};
