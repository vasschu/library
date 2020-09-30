import mariadb from 'mariadb';

const pool = mariadb.createPool({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: 'twffox',
	database: 'library',
});

export default pool;
