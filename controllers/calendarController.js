const mongoose = require('mongoose');
const Calendar = require('../models/calendarModel');

module.exports.indexCalendar = (req, res) => {
  res.render('calendar/index');
};

module.exports.getEvents = async (req, res) => {
  const events = await Calendar.find();
  res.send(events);
};

module.exports.addEvent = (req, res) => {
  const id = new mongoose.Types.ObjectId();
  Calendar.create(
    {
      _id: id,
      ...req.body,
    },
    () => {
      res.send('adding successful');
    }
  );
};
