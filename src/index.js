import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import libraryController from './library-controller.js';

const app = express();
const PORT = 5500;

app.use(cors(), bodyParser.json());

app.use('/books', libraryController);

//this is wildcard to capture all unsuported requests
app.all('*', (req, res) =>
	res.status(404).send({ message: 'Resource not found!' }),
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
