import Joi from 'joi';

const pinValidation = data => {
  const schema = Joi.object({
    username: Joi.string().min(1).required(),
    place: Joi.string().min(1).max(50).required(),
    desc: Joi.string().min(1).max(200).required(),
    rating: Joi.number().min(1).max(5).required(),
    lat: Joi.number().min(1).required(),
    long: Joi.number().min(1).required(),
    createDate: Joi.date().required(),
  });
  return schema.validate(data);
};

export default pinValidation;