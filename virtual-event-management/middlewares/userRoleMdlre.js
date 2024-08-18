function verifyRole(req, res, next) {
  const { message } = res;
  if (req.user === undefined) {
    return res.status(req.status).json({ message });
  }
  if (req.user && req.user.role === 'organizer') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied' });
}

module.exports = { verifyRole };
