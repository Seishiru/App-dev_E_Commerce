const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  database: 'app_e_commerce_db',
});

// Controller function to get addresses by user_id
const getAddressesByUserId = (req, res) => {
  const userId = req.params.user_id;

  const query = 'SELECT * FROM addresses WHERE user_id = ?';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching addresses:', err);
      return res.status(500).json({ message: 'Error fetching addresses' });
    }
    return res.json(results);
  });
};

module.exports = { getAddressesByUserId };
