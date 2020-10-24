const validateObject = (schema, object) =>
	Object.keys(schema).every((key) => schema[key](object[key]));

/**
 * Validate request body against provided Shema
 * @param {object} schema object must have mapped key:Value pairs to run the checks against*
 * @return {function} if validation is OK, it passes the request body to the next middleware.
 * @return {error} if validation is NOK, it send respond.
 */
export const validateBody = (schema) => (req, res, next) => {
	if (validateObject(schema, req.body)) {
		return next();
	}

	res.status(400).send({ message: 'Invalid body!' });
};
