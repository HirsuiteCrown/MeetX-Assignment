const express = require('express');
const { 
  createActivity, 
  getActivities, 
  getActivity 
} = require('../controller/activityController');
const { protect } = require('../Middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getActivities)
  .post(protect, createActivity); //we can do admin access here

router.route('/:id')
  .get(getActivity);

module.exports = router;