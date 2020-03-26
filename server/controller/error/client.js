exports.clientError = (req, res) => {
  res.status(404).json({ error: 'Page Not Found' });
};
