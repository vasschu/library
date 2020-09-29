import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import libraryController from './library-controller.js';

const app = express();
const PORT = 5500;

app.use(cors(), bodyParser.json());

app.use('/books', libraryController);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
