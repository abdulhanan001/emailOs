import Joi from 'joi';

const validateUserInput = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    gender: Joi.string().valid('male', 'female').required(),
    age: Joi.number().integer().min(18).required(),
    about: Joi.string().required(),
    dob: Joi.date().iso().required(),
    education: Joi.string().valid('becahlurar', 'MS', 'PHD').required(),
  });

  return schema.validate(user);
};

export { validateUserInput };
