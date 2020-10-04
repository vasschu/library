import express from 'express';
import usersService from './../service/users-service.js';

const usersController = express.Router();

usersController
	// create user
	.post('/', async (req, res) => {
		const createData = req.body;

		return await usersService.createUser(createData);
	});

export default usersController;
