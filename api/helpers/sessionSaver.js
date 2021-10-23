const express = require("express");

const saveSession = (req, res, next) => {
  req.session.userID = res.locals.userID;
  try {
    req.session.save(() => {
      console.log(`Saved a session: ${req.session.toString()}`);
      res.status(201).json({
        sessionID: req.session.id,
        userID: res.locals.userID,
      });
    });
    // next();
  } catch (err) {
    res
      .status(400)
      .json([{ errName: err.name, errMsg: err.message, errStack: err.stack }]);
  }
};
module.exports = saveSession;
