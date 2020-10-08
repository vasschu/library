import pool from './pool.js';

const getBookReviews = async (bookId) => {
	const sql = `SELECT r.id, r.title, r.content, r.is_deleted, u.username, b.title AS book_title, b.author
    FROM library.reviews AS r
    JOIN users AS u ON users_id = u.id
    JOIN books AS b ON books_id = b.id
    WHERE books_id = ? AND r.is_deleted = ?;`;
	// console.log(sql);
	return await pool.query(sql, [bookId, 0]);
};

const postBookReview = async (body) => {
	const { title, content, users_id, books_id } = body;

	// console.log(body);
	const sql = `INSERT INTO library.reviews (title, content, users_id, books_id)
    VALUES (?, ?, ?, ?);`;

	return await pool.query(sql, [title, content, users_id, books_id]);
};

const getReview = async (id) => {
	const sql = `SELECT r.id, r.title, r.content, r.is_deleted, u.id AS user_id, u.username, b.id AS book_id
    FROM reviews AS r
    JOIN users AS u ON users_id = u.id
    JOIN books AS b ON books_id = b.id
    WHERE r.id = ? AND r.is_deleted = ?;`;

	const review = await pool.query(sql, [id, 0]);
	console.log(review[0]);
	return {
		id: review[0].id,
		title: review[0].title,
		content: review[0].content,
		user_id: review[0].user_id,
		username: review[0].username,
	};
};

const updateReview = async (id, title, content) => {
	const sql = `UPDATE reviews
    SET title = ?, content = ?
    WHERE id = ?;`;

	return await pool.query(sql, [title, content, id]);
};

const getBookById = async (id) => {
	const sql = `SELECT b.id AS book_id, b.title AS book_title, r.id AS review_id, r.is_deleted, u.id AS user_id, u.user_level
    FROM books AS b
    JOIN reviews AS r ON r.books_id = b.id
    JOIN users AS u ON u.id = r.users_id
    WHERE b.id = ? AND r.is_deleted = ?`;

	return await pool.query(sql, [id, 0]);
};

const deleteReview = async (id) => {
	const sql = `UPDATE reviews
    SET is_deleted = ?
    WHERE id = ?;`;

	return await pool.query(sql, [1, id]);
};

/**
 * rate review
 * @param {number} review_id
 * @param {number} user_id
 * @param {boolean} rating - 1 for like, 0 for dislike
 * @returns {object} infomrs if row is updated.
 */
const rateReview = async (review_id, user_id, rating) => {
	const sql = `INSERT INTO library.review_likes (rating, reviews_id, user_id)
    VALUES (?, ?, ?);`;

	return await pool.query(sql, [rating, review_id, user_id]);
};

/**
 * Get all borrowed books by user
 * @param {number} review_id(optional, use null as argument to skip this) the id of the review
 * @param {number} user_id(optional, use null as argument to skip this) the id of the user
 * @return {object}
 */
const getReviewLikes = async (review_id, user_id) => {
	const sql = `select * from library.review_likes
	where (${user_id} is null or user_id = ${user_id})
	and (${review_id} is null or reviews_id = ${review_id})`;

	return await pool.query(sql, [user_id, review_id]);
};

const updateReviewScore = async (reviewScoreId, rating) => {
	const sql = `UPDATE review_likes
	SET rating = ?
	WHERE id = ?`;
	return await pool.query(sql, [rating, reviewScoreId]);
};

const getReviewByUser = async (bookId, userId) => {
	const sql = `SELECT * FROM reviews
	WHERE books_id = ?
	AND users_id = ?`;

	return await pool.query(sql, [bookId, userId]);
};

export default {
	getBookReviews,
	postBookReview,
	getReview,
	updateReview,
	deleteReview,
	getBookById,
	rateReview,
	getReviewLikes,
	updateReviewScore,
	getReviewByUser,
};
