const { join } = require('path');

exports.clientError = (req, res) => {
  res.status(404);
  res.sendFile(
    join(__dirname, '..', '..', '..', 'client', 'build', '404.html')
  );
};
