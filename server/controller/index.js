const { serverError } = require("./error/server");
const { clientError } = require("./error/client");
const { getEvents } = require("./routes/user");
const { cancelRegistration } = require("./routes/user");

module.exports = {
  serverError,
  clientError,
  getEvents,
  cancelRegistration
};
