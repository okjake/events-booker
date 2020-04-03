const portalLogout = (req, res) => {
  res.clearCookie('portalToken');
  res.json({ statusCode: 200, message: 'portal logged out successfully' });
};

module.exports = portalLogout;
