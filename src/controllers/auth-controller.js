import express from 'express';
import serviceErrors from '../common/error-messages/service-errors.js';
import usersService from '../service/users-service.js';
import { createToken } from '../auth/create-token.js';
import { authMiddleware } from './../auth/auth-middleware.js';
import { logInBody } from '../validators/login-body.js';
import { validateBody } from '../middleware/body-validator.js';

const authController = express.Router();

authController
	.post('/login', validateBody(logInBody), async (req, res) => {
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
	.delete('/session', authMiddleware, async (req, res) => {
		const name = req.user.username;

		res
			.status(204)
			.send(
				// eslint-disable-next-line no-irregular-whitespace
				`{message: User '${name}' has been fake logged out. See you soon in the blacklist. (▀̿ ̿̃ ͜ʖ▀̿ ̿ ̃)}`,
			);
	});

export default authController;
