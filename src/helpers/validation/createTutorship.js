import Joi from 'joi';

export default (input) => {
  const schema = Joi.object().keys({
    receiverId: Joi.number().required(),
    tutoringId: Joi.number().required(),
    message: Joi.string().min(10).max(1000).required(),
    messageType: Joi.string().min(2).max(20).required(),
    type: Joi.string().min(2).max(20).optional(),
    link: Joi.string().min(5).max(150).optional(),
    tuteeId: Joi.number().required()
  });
  return Joi.validate(input, schema, { abortEarly: false });
};
