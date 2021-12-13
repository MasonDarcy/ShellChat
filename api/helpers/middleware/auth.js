const auth = function (req, res, next) {
  if (req.session.userID) {
    next();
  } else {
    res.status(401).json({ msg: "No previous session." });
  }
};

module.exports = auth;
