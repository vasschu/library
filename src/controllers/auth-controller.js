import express from 'express';
import serviceErrors from '../common/error-messages/service-errors.js';
import usersService from '../service/users-service.js';
import { createToken } from '../auth/create-token.js';
import {
	authMiddleware,
	tokenExtract,
	addTokenToBlacklist,
	tokenIsBlacklisted,
} from './../auth/auth-middleware.js';
import { logInBody } from '../middleware/validators/login-body.js';
import { validateBody } from '../middleware/body-validator.js';
// import { client } from './../auth/auth-middleware.js';
// import redis from 'redis';

const authController = express.Router();

authController
	/**
	 * Login
	 * @param {string} username from req.body {username}
	 * @param {string} password from req.body {password}
	 * @return {object} return the new token or error message
	 */
	.post('/session', validateBody(logInBody), async (req, res) => {
		const body = req.body;

		const user = await usersService.logIn(body);

		if (
			user.error === serviceErrors.INVALID_LOGIN ||
			user.result.is_deleted === 1
		) {
			return res.status(400).send({ message: 'Invalid username/password' });
		}
		console.log(user);
		const payload = {
			sub: user.result.id,
			username: user.result.username,
			role: user.result.level,
		};

		const token = createToken(payload);

		res.status(200).send({ token: token });
	})
	/**
	 * Logout - blacklists the token of the user.
	 * @return {object} return logout message
	 */
	.delete(
		'/session',
		tokenExtract(),
		tokenIsBlacklisted(),
		authMiddleware,
		async (req, res) => {
			const name = req.user.username;
			addTokenToBlacklist(req.token);
			res
				.status(202)
				.send(`{ "message" : User '${name}' has been logged out.}`);
		},
	);

export default authController;
