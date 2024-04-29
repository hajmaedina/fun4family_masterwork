import Joi from "joi";

const commentValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(1).required(),
    desc: Joi.string().min(6).required(),
    rating: Joi.number().min(1).required(),
    pinId: Joi.string().min(1).required(),
  });
  return schema.validate(data);
};

export default commentValidation;
