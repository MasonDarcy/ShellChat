const checkAuth = function (req, res, next) {
  if (req.session.userID) {
    next();
  } else {
    try {
      res.status(200).json({ msg: "NO_COOKIE" });
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  }
};

module.exports = checkAuth;
