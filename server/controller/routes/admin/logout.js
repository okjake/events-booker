const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'logged out successfully' });
};

module.exports = logout;
