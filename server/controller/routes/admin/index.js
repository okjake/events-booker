const { login } = require('./login');
const { getUsersEvent } = require('./viewUsers');
const { getUsersData } = require('./getUsers');
const { validateEvent, createEvent } = require('./createEvent');
const { deleteEvent } = require('./deleteEvent');

module.exports = {
  validateEvent, createEvent, getUsersEvent, getUsersData, login, deleteEvent,
};
