const auth = function (req, res, next) {
  if (req.session.userID) {
    console.log("authMiddleware/Succesfully Authorized.");
    next();
  } else {
    console.log("Got into auth fail");
    console.log(`credentials: ${req.session.userID}`);
    res.status(401).json({ msg: "No previous session." });
  }
};

module.exports = auth;
