const validateObject = (schema, object) => Object
  .keys(schema)
  .every(key => schema[key](object[key]));

export const validateBody = (schema) => (req, res, next) => {
  if (validateObject(schema, req.body)) {
    return next();
  }

  res.status(400).send({ Message: 'Invalid body!' });
};
