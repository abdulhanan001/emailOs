export const validateMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const validationErrors = error.details.map((detail) => detail.message);
      return res.status(422).json({ errors: validationErrors });
    }

    next();
  };
};