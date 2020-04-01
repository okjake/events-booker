const login = require('./login');
const logout = require('./logout');
const getUsersEvent = require('./viewUsers');
const getUsersData = require('./getUsers');
const { validateEvent, createEvent } = require('./createEvent');
const deleteEvent = require('./deleteEvent');
const viewEventsOnDate = require('./viewEventsOnDate');

module.exports = {
  validateEvent,
  createEvent,
  getUsersEvent,
  getUsersData,
  login,
  logout,
  viewEventsOnDate,
  deleteEvent,
};
