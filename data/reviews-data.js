import pool from './pool.js';

const getBookReviews = async (bookId) => {
    const sql = `SELECT r.id, r.title AS heading, r.content, u.username, b.title, b.author 
    FROM library.reviews AS r
    JOIN users AS u ON users_id = u.id
    JOIN books AS b ON books_id = b.id
    WHERE books_id = ${bookId};`;
    // console.log(sql);
    return await pool.query(sql);
};

const postBookReview = async (body) => {
    const { title, content, user_id, book_id } = body;

    // console.log(body);
    const sql = `INSERT INTO library.reviews (title, content, users_id, books_id)
    VALUES (?, ?, ?, ?);`;

    return await pool.query(sql, [title, content, user_id, book_id]);
};

export default {
    getBookReviews,
    postBookReview,

};