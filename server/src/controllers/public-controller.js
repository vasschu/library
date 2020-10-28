import express from 'express';
import libraryService from '../service/library-service.js';

const publicController = express.Router();

	/**
    * View individual book by ID
    * @param {number} id from the http
    * @return {object} return 'error' if no books found or array containing book info {"id","title","author","borrowed","is_unlisted"}
    */
    publicController.get('/:id', async (req, res) => {
       const { id } = req.params;
       const booksToShow = await libraryService.getBookById(+id);

       const { error, result } = booksToShow;
       console.log(result)
       if (!error) {
           res.status(200).send(result);
       } else {
           res.status(404).send({ message: 'No books found with this ID.' });
       }
   })

   export default publicController;