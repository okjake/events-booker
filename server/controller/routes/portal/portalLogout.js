const portalLogout = (req, res) => {
  res.clearCookie('portalToken');
  res.json({ statusCode: 200, msg: 'logged out successfully' });
};

module.exports = portalLogout;
