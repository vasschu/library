import passport from 'passport';
// import redis from 'redis';

export const authMiddleware = passport.authenticate('jwt', { session: false });

// export const client = redis.createClient();

export const roleMiddleware = (...permittedRoles) => {
	return (req, res, next) => {
		console.log(req.user.role);
		if (req.user && permittedRoles.includes(req.user.role)) {
			next();
		} else {
			res.status(403).send({ message: 'Resource is forbidden.' });
		}
	};
};

export const tokenIsBlacklisted = () => {
	return (req, res, next) => {
		if (!blackList.has(req.token)) {
			next();
		} else {
			res.status(403).send({ message: 'You logged out. Please login again' });
		}
	};
};

export const tokenExtract = () => {
	return (req, res, next) => {
		const tokenHeader = req.headers.authorization.split(' ');
		const token = tokenHeader[1];
		req.token = token;
		next();
	};
};

const blackList = new Set();

export const addTokenToBlacklist = (token) => {
	blackList.add(token);
};
