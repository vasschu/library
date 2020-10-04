import express from 'express';
import serviceErrors from '../../common/error-messages/service-errors.js';
import usersService from '../service/users-service.js';
import {createToken} from '../auth/create-token.js';

const authController = express.Router();

authController
.post('/login', async (req, res) => {
    const body = req.body;

    const user = await usersService.logIn(body);

    if (user === serviceErrors.INVALID_LOGIN){
        return res.status(400).send({message: 'Invalid username/password'});
    }

    const payload = {
        sub: user.id,
        username: user.username,
        role: user.level,
    };

    const token = createToken(payload);

    res.status(200).send(token);
});

export default authController;
