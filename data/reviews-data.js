import pool from './pool.js';

const getBookReviews = async (bookId) => {
    const sql = `SELECT r.id, r.title, r.content, u.username, b.title AS book_title, b.author 
    FROM library.reviews AS r
    JOIN users AS u ON users_id = u.id
    JOIN books AS b ON books_id = b.id
    WHERE books_id = ?;`;
    // console.log(sql);
    return await pool.query(sql, [bookId]);
};

const postBookReview = async (body) => {
    const { title, content, users_id, books_id } = body;

    // console.log(body);
    const sql = `INSERT INTO library.reviews (title, content, users_id, books_id)
    VALUES (?, ?, ?, ?);`;

    return await pool.query(sql, [title, content, users_id, books_id]);
};

const getReview = async (id) => {
    const sql = `SELECT r.id, r.title, r.content, u.id AS user_id, u.username, b.id AS book_id
    FROM reviews AS r
    JOIN users AS u ON users_id = u.id
    JOIN books AS b ON books_id = b.id
    WHERE r.id = ?;`;

    return await pool.query(sql, [id]);
};

const updateReview = async (id, title, content) => {
    const sql = `UPDATE reviews
    SET title = ?, content = ?
    WHERE id = ?;`;

    return await pool.query(sql, [title, content, id]);

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
};