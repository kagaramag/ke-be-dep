import Joi from '@hapi/joi';

export default (report) => {
  const schema = Joi.object().keys({
    gender: Joi
      .string()
      .valid('male', 'female')
      .required(),
  });

  return Joi.validate(report, schema, { abortEarly: false });
};
