export const rateReviewSchema = {
	rating: (rating) => !isNaN(rating) && rating >= 0 && rating <= 1,
};
