const auth = function (req, res, next) {
  if (req.session.userID) {
    console.log("Authorized.");
    next();
  } else {
    console.log("Got into auth fail");
    res.status(400).json([{ msg: "No previous session." }]);
  }
};

module.exports = auth;
