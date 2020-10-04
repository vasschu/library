import passport from 'passport';

export const authMiddleware = passport.authenticate('jwt', {session: false});

export const roleMiddleware = roleName => {
    return (req, res, next) => {
        if (req.user && req.user.role === roleName) {
            next();
        } else {
            res.status(403).send({ message: 'Resource is forbidden.' });
        }
    };
};
