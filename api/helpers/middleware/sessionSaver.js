const express = require("express");

const saveSession = (req, res) => {
  req.session.userID = res.locals.agentID;
  try {
    return res.status(201).json({
      sessionID: req.session.id,
      agentID: res.locals.agentID,
    });
  } catch (err) {
    res
      .status(400)
      .json([{ errName: err.name, errMsg: err.message, errStack: err.stack }]);
  }
};
module.exports = saveSession;
