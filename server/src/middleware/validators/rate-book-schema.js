export const rateBookSchema = {
    rating: rating => !isNaN(rating) && (rating > 0 && rating <= 5),
};