import mariadb from 'mariadb';

const pool = mariadb.createPool({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: '', //place your mariaddb password in the string
	database: '', //place the name of the database in the string
});

export default pool;
