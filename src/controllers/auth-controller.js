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
	.post('/session', validateBody(logInBody), async (req, res) => {
		const body = req.body;

		const user = await usersService.logIn(body);

		if (user.message === serviceErrors.INVALID_LOGIN) {
			return res.status(400).send({ message: 'Invalid username/password' });
		}

		const payload = {
			sub: user.id,
			username: user.username,
			role: user.level,
		};

		const token = createToken(payload);

		res.status(200).send(token);
	})
	.delete(
		'/session',
		tokenExtract(),
		tokenIsBlacklisted(),
		authMiddleware,
		async (req, res) => {
			const name = req.user.username;
			addTokenToBlacklist(req.token);
			// eslint-disable-next-line no-irregular-whitespace
			const msg = `{message: User '${name}' has been fake logged out. See you soon in the blacklist. (▀̿ ̿̃ ͜ʖ▀̿ ̿ ̃)}`;

			res.status(204).send(msg);
		},
	);

export default authController;
