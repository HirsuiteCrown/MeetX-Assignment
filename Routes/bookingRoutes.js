const express = require('express');
const { 
  bookActivity, 
  getUserBookings 
} = require('../controller/bookingController');
const { protect } = require('../Middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getUserBookings)
  .post(bookActivity);

module.exports = router;