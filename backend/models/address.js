const db = require('../db');  // Make sure you're using your db connection here.

// You can directly write SQL queries like this:
const addAddress = (userId, receiver, address, phoneNumber, type) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO addresses (user_id, receiver, address, phone_number, type)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(query, [userId, receiver, address, phoneNumber, type], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

module.exports = { addAddress };
