const logout = require('./logout');
const getEventUsers = require('./getEventUsers');
const getUsersData = require('./getUsers');
const { validateEvent, createEvent } = require('./createEvent');
const deleteEvent = require('./deleteEvent');
const viewEventsOnDate = require('./viewEventsOnDate');
const getAdmin = require('./getAdmin');

module.exports = {
  validateEvent,
  createEvent,
  getEventUsers,
  getUsersData,
  logout,
  viewEventsOnDate,
  deleteEvent,
  getAdmin,
};
