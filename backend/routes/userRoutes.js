const express = require('express');
const router = express.Router();

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);


// Example route for users
router.get('/', (req, res) => {
  res.send('User route is working');
});

module.exports = router;
