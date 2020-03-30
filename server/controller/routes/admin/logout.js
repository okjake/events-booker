const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ statusCode: 200, message: 'logged out successfully' });
};

module.exports = { logout };
