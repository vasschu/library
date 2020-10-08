/* eslint-disable no-unused-vars */
import pool from '../data/pool.js';

const userLevels = {
	regular: 1000,
	powerReader: 2000,
	masterReader: 5000,
	moderator: 10000,
};

const readerPoints = {
	returnedBook: 100,
	// delayedReturn: -75,
	ratedBook: 20,
	ratedReview: 1,
	isBanned: -500,
};

const sql = {
	readBooks: `SELECT count(username) as total FROM users as u
left outer join borrowed_books as bb
on u.id = bb.users_id
where u.id = ? and bb.is_deleted = 1`,
	ratedBooks: `SELECT count(username) as total FROM users as u
left outer join book_ratings as br
on u.id = br.users_id
where u.id = ?`,
	ratedReview: `SELECT count(username) as total FROM users as u
left outer join review_likes as rl
on u.id = rl.user_id
where u.id = ?`,
	banned: `SELECT count(username) as total FROM users as u
left outer join banned_users as bu
on u.id = bu.users_id
where u.id = ?`,
};

/**
 * Gamification points calculator
 * @param {number} user_id from req.user
 * @return {number} The number of points the user collected so far
 */
export const calculatePoints = async (userId) => {
	const bookPoints = await pool.query(sql.readBooks, userId);
	const ratingsPoints = await pool.query(sql.ratedBooks, userId);
	const reviewPoints = await pool.query(sql.ratedReview, userId);
	const bannedPenalty = await pool.query(sql.banned, userId);

	const currentPoints =
		bookPoints[0].total * readerPoints.returnedBook +
		ratingsPoints[0].total * readerPoints.ratedBook +
		reviewPoints[0].total * readerPoints.ratedReview +
		bannedPenalty[0].total * readerPoints.isBanned;

	return await currentPoints;
};
