import Joi from 'joi';

const registerValidation = data => {
  const schema = Joi.object({
    username: Joi.string().min(1).max(100).required(),
    email: Joi.string().min(1).max(100).required().email(),
    password: Joi.string().min(6).max(100).required(),
  });
  return schema.validate(data);
};

export default registerValidation;