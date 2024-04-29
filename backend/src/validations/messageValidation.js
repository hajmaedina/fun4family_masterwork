import Joi from 'joi';

const messageValidation = data => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    email: Joi.string().min(1).max(100).required().email(),
    message: Joi.string().min(1).max(1000).required(),
  });
  return schema.validate(data);
};

export default messageValidation;