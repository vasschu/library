import express from 'express';
import reviewsService from './reviews-service.js';


import {validateBody} from './middleware/body-validator.js';
import {reviewShema} from './validators/create-review.js';
import {updateReviewShema} from './validators/update-review.js';
import {deleteReviewShema} from './validators/delete-review.js';

const reviewsController = express.Router();

	reviewsController
	//get reviews for specific book by ID
	.get('/:id/reviews', async (req, res) => {
		try {
			const { id } = req.params;

			const reviews = await reviewsService.getAllBookReviews(id);

			if (reviews.message) {
				return res.status(reviews.status).send({ message: reviews.message});
			}
			
			res.status(200).send(reviews);

		} catch (err) {
			throw new Error(err);
		}
	})

	//post review to specific book by ID
	.post('/:id/reviews', validateBody(reviewShema), async (req, res) => {
		try {
			const body = req.body;
			const reviews = await reviewsService.postReview(body);

			res.status(201).send(reviews);

		} catch (err) {
			throw new Error(err);
		}
	})

	.put('/:id/reviews/:reviewid', validateBody(updateReviewShema), async (req, res) => {
		try {
			const { reviewid }  = req.params;
			const body = req.body;

			const update = await reviewsService.updateReviewById(reviewid, body);

			if(update.message){
				return res.status(update.status).send({мessage: update.message});
            }
            
            res.status(200).send(update);
		} catch (err) {
			throw new Error(err);
		}
    })

    .delete('/:id/reviews/:reviewid', validateBody(deleteReviewShema), async (req, res) => {
		try {
			const { id, reviewid }  = req.params;
			const body = req.body;

			const update = await reviewsService.deleteReviewById(reviewid, body, id);

			if(update.message){
				return res.status(update.status).send({message: update.message});
            }
            
            res.status(200).send(update);
		} catch (err) {
			throw new Error(err);
		}
    });
    
export default reviewsController;
