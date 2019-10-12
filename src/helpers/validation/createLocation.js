import Joi from "joi";

export default input => {
  const schema = Joi.object().keys({
    province: Joi.string().required(),
    district: Joi.string().required(),
    sector: Joi.string().required(),
    cell: Joi.string().required(),
    village: Joi.string().required(),
    houseNumber: Joi.string()
  });
  return Joi.validate(input, schema, { abortEarly: false });
};
