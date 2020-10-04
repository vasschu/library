import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';

import jwtStrategy from './auth/strategy.js';

import libraryController from './controllers/library-controller.js';
import reviewsController from './controllers/reviews-controller.js';
import usersController from './controllers/users-controller.js';
import authController from './controllers/auth-controller.js';

const app = express();
const PORT = 5500;

passport.use(jwtStrategy);
app.use(cors(), bodyParser.json());

app.use(passport.initialize());

app.use('/books', libraryController);
libraryController.use(reviewsController);
app.use('/users', usersController);
app.use('/auth', authController);

//this is wildcard to capture all unsuported requests
app.all('*', (req, res) =>
	res.status(404).send({ message: 'Resource not found!' }),
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
