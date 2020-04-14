const portalLogout = (req, res) => {
  res.clearCookie('portalToken');
  res.json({ msg: 'logged out successfully' });
};

module.exports = portalLogout;
