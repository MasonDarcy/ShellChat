const express = require("express");

const saveSession = (req, res) => {
  req.session.userID = res.locals.agentID;
  try {
    req.session.save(() => {
      console.log(`Saved a session: ${req.session.toString()}`);

      return res.status(201).json({
        sessionID: req.session.id,
        agentID: res.locals.agentID,
      });
    });
  } catch (err) {
    res
      .status(400)
      .json([{ errName: err.name, errMsg: err.message, errStack: err.stack }]);
  }
};
module.exports = saveSession;
