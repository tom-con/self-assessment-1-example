require('dotenv').config({ path: '.env.local' })

module.exports = {
	client: 'pg',
	connection: {
		user: process.env.PG_USER,
		password: process.env.PG_PASS,
		port: process.env.PG_PORT,
		database: process.env.PG_DB,
		host: process.env.PG_HOST
	},
};
