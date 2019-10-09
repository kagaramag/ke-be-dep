import Joi from 'joi';

export default (input) => {
  const schema = Joi.object().keys({
    graduated: Joi.boolean(),
    yearOfGraduation: Joi.date()
      .required(),
    college: Joi.string()
      .valid('College/University', 'High School')
      .required(),
    institution: Joi.string().required(),
    course: Joi.string().required(),
    certificate: Joi.string().required()
  });
  return Joi.validate(input, schema, { abortEarly: false });
};
