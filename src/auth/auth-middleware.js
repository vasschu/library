import passport from 'passport';
import redis from 'redis';

export const authMiddleware = passport.authenticate('jwt', { session: false });

export const client = redis.createClient();

export const roleMiddleware = (...permittedRoles) => {
	return (req, res, next) => {
		if (req.user && permittedRoles.includes(req.user.role)) {
			next();
		} else {
			res.status(403).send({ message: 'Resource is forbidden.' });
		}
	};
};

export const tokenValidator = (token) => {
	client.get(token, redis.print);
};
