const express = require("express");
const router = express.Router();
const Agent = require("../models/Agent");
const bcrypt = require("bcrypt");
const SALT_VAL = 10;

const { check, validationResult } = require("express-validator");

router.post("/", async (req, res) => {
  try {
    [agentName, password] = req.body;

    //Check if agent exists already
    const agentQuery = Agent.findOne({ agentName });
    if (!agentQuery) {
      return res.status(400).json({
        msg: "Duplicate agent.",
      });
    }
    //----------------------------

    const newAgent = Agent({
      agentName,
      password,
    });

    //Encrypt password
    const salt = await bcrypt.genSalt(SALT_VAL);
    newAgent.password = await bcrypt.hash(newAgent.password, salt);

    //Save password
    await newAgent.save();
  } catch (err) {
    res.status(400).json({
      errorMessage: err.message,
      errorName: err.name,
      errorStack: err.stack,
    });
  }
});
