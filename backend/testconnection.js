const mysql = require('mysql2/promise');

async function testConnection() {
    try {
        const connection = await mysql.createConnection({
            host: '127.0.0.1',  // Use local address
            user: 's22105000_Appdev',
            password: '12341234',
            database: 's22105000_Appdev',
            port: 3306,  // Local port forwarded to MySQL on the remote server
        });
        console.log('Connected to the database!');

        // Query the first row from the 'users' table
        const [rows] = await connection.execute('SELECT * FROM users LIMIT 1');
        
        if (rows.length > 0) {
            console.log('First row in "users" table:', rows[0]);
        } else {
            console.log('No rows found in "users" table.');
        }

        connection.end();
    } catch (error) {
        console.error('Connection failed:', error);
    }
}

testConnection();
