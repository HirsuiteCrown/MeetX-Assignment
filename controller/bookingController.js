const Booking = require('../Models/Booking');
const Activity = require('../Models/Activity');
const { bookingSchema } = require('../utils/validator');

const bookActivity = async (req, res, next) => {
  try {
    const result = bookingSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: result.error.errors.map(e => e.message)
      });
    }

    const { activityId } = req.body;

    const activity = await Activity.findById(activityId);

    if (!activity) {
      return res.status(404).json({
        success: false,
        error: 'Activity not found'
      });
    }

    const existingBooking = await Booking.findOne({
      user: req.user._id,
      activity: activityId
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        error: 'You have already booked this activity'
      });
    }

    const booking = await Booking.create({
      activity: activityId,
      user: req.user._id
    });

    await booking.populate('activity');

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    next(error);
  }
};

const getUserBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('activity')
      .sort({ bookingDate: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  bookActivity,
  getUserBookings
};
