import express from 'express';
import usersService from '../service/users-service.js';
import { logInBody } from '../middleware/validators/login-body.js';
import { validateBody } from '../middleware/body-validator.js';
import serviceErrors from '../common/error-messages/service-errors.js';

import { authMiddleware } from '../auth/auth-middleware.js';
import { roleMiddleware } from '../auth/auth-middleware.js';

const usersController = express.Router();

usersController
	/**
	 * Register user
	 * @param {string} username from req.body {username}
	 * @param {string} password from req.body {password}
	 * @return {object} return message with user details or error message
	 */
	.post('/', validateBody(logInBody), async (req, res) => {
		const createData = req.body;

		const CreatedUser = await usersService.createUser(createData);

		const { error, result } = CreatedUser;
		if (error === serviceErrors.DUPLICATE_RECORD) {
			res.status(409).send({
				message: 'This username is already taken. Please choose new username.',
			});
		} else {
			res
				.status(201)
				.send({ message: 'User was created sucssesfully.', user: result });
		}
	})
	/**
	 * Delete user
	 * @param {number} usern_id from req.body {user_id}
	 * @return {object} return message with deleted user details or error message
	 */
	.delete('/', authMiddleware, roleMiddleware('admin'), async (req, res) => {
		const userToDelete = req.body.user_id;
		const role = req.user.role;

		const deletedUser = await usersService.deleteUser(userToDelete, role);

		const { error, result } = deletedUser;
		if (error === serviceErrors.NO_DATABASE_CHANGES) {
			res.status(404).send({
				message: 'This user was not deleted.',
			});
		} else {
			res.status(202).send({ message: 'User was deleted.', user: result });
		}
	})
	/**
	 * Ban user
	 * @param {number} usern_id from req.body {user_id}
	 * @param {string} reason for ban from req.body {reason}
	 * @return {object} return message with banned user details or error message
	 */
	.put('/', authMiddleware, roleMiddleware('admin'), async (req, res) => {
		const { user_id, reason } = req.body;
		const role = req.user.role;

		const bannedUser = await usersService.banUser(user_id, reason, role);

		const { error, result, level } = bannedUser;
		if (error === serviceErrors.NO_DATABASE_CHANGES) {
			res.status(404).send({
				message: 'This user was not banned.',
			});
		} else {
			res
				.status(202)
				.send(`User ${result.username}, with id ${result.id} is banned. Their level is now ${level}`);
		}
	});

export default usersController;
