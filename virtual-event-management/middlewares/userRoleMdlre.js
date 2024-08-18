function verifyRole(req, res, next) {
  if (req.user && req.user.role === 'organizer') {
    return next();
  }
  return res.status(403).json({ message: 'Access denied' });
}

module.exports = { verifyRole };
