const mongoose = require('mongoose');

const CalendarSchema = new mongoose.Schema({
  title: String,
  start: Date,
  end: Date,
  created: Date,
});

const Calendar = mongoose.model('Calendar', CalendarSchema, 'events');

module.exports = Calendar;
