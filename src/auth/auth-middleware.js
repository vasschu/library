import passport from 'passport';

export const authMiddleware = passport.authenticate('jwt', {session: false});

export const roleMiddleware = (...permittedRoles) => {
    return (req, res, next) => {
        if (req.user && (permittedRoles.includes(req.user.role))) {
            next();
        } else {
            res.status(403).send({ message: 'Resource is forbidden.' });
        }
    };
};
