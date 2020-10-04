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

    return await pool.query(sql, [id, 0]);
};

const updateReview = async (id, title, content) => {
    const sql = `UPDATE reviews
    SET title = ?, content = ?
    WHERE id = ?;`;

    return await pool.query(sql, [title, content, id]);

};

const getBookById = async (id) => {
    const sql = `SELECT b.id AS book_id, b.title AS book_title, r.id AS review_id, r.is_deleted, u.id AS user_id
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

export default {
    getBookReviews,
    postBookReview,
    getReview,
    updateReview,
    deleteReview,
    getBookById,
};