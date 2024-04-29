import Joi from 'joi'

const loginValidation = data => {
  const schema = Joi.object({
    username: Joi.string().min(1).required(),
    password: Joi.string().min(6).required(),
  });
  
  return schema.validate(data);
};

export default loginValidation;