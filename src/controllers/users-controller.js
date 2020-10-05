import express from 'express';
import usersService from './../service/users-service.js';
import { logInBody } from './../validators/login-body.js';
import { validateBody } from './../middleware/body-validator.js';
import serviceErrors from '../common/error-messages/service-errors.js';

const usersController = express.Router();

usersController
	// create user
	.post('/', validateBody(logInBody), async (req, res) => {
		const createData = req.body;

		const CreatedUser = await usersService.createUser(createData);

		const { error, result } = CreatedUser;
		if (error === serviceErrors.DUPLICATE_RECORD) {
			res.status(200).send({
				message: 'This username is already taken. Please choose new username.',
			});
		} else {
			res
				.status(200)
				.send({ message: 'User was created sucssesfully.', user: result });
		}
	});

export default usersController;
