const logout = require('./logout');
const getUsersEvent = require('./viewUsers');
const getUsersData = require('./getUsers');
const { validateEvent, createEvent } = require('./createEvent');
const deleteEvent = require('./deleteEvent');
const viewEventsOnDate = require('./viewEventsOnDate');
const getAdmin = require('./getAdmin');

module.exports = {
  validateEvent,
  createEvent,
  getUsersEvent,
  getUsersData,
  logout,
  viewEventsOnDate,
  deleteEvent,
  getAdmin,
};
