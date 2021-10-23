const express = require("express");
const Agent = require("../models/Agent");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const auth = require("./helpers/auth");
const sessionSaver = require("./helpers/sessionSaver");
const errorTool = require("./helpers/errors");
const router = express.Router();
const SALT_VAL = 10;

// @route   post api/agents
// @desc    register agent
// @access  public
router.post(
  "/",
  [
    check("agentName", "Name is required.").not().isEmpty(),
    check("password", "Password is required.").not().isEmpty(),
  ],
  async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errs: errors.array() });
    }

    try {
      const { agentName, password } = req.body;

      //Check if agent exists already
      const agentQuery = await Agent.findOne({ agentName });

      if (agentQuery) {
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
      //Pass the agent id into res locals, to associate it with the session in the subsequent middleware sessionSaver
      res.locals.userID = newAgent.id;
      // res.status(201).json({ msg: "Agent created.", agent: newAgent });
      next();
    } catch (err) {
      errorTool.error400(err, res);
    }
  },
  sessionSaver
);

// @route   get api/agents
// @desc    Logs in an agent
// @access  public

router.get(
  "/",
  [
    check("agentName", "Name is required.").not().isEmpty(),
    check("password", "Password is required.").not().isEmpty(),
  ],
  async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errs: errors.array() });
    }

    try {
      const { agentName, password } = req.body;
      const fetchedAgent = await Agent.findOne({ agentName });

      //Does this agent exist
      if (!fetchedAgent) {
        return res.status(404).json({ msg: "Agent not found." });
      }

      //Compare the encrypted password to the supplied password
      const isMatch = await bcrypt.compare(password, fetchedAgent.password);

      if (isMatch) {
        res.locals.agentID = fetchedAgent.id;
        next();
      } else {
        return res.status(401).json({ msg: "Incorrect credentials." });
      }
    } catch (err) {
      console.log("Got here");
      errorTool.error400(err, res);
    }
  },
  sessionSaver
);

// @route   DELETE api/agents/logout
// @desc    Logs out an agent
// @access  private

router.delete("/logout", async (req, res) => {
  try {
    //Destroys the users session
    req.session.destroy();

    res.status(200).json({ msg: "Session ended, successfully logged out." });
  } catch (err) {
    console.log("Got here");
    errorTool.error400(err, res);
  }
});

// @route   get api/agents/:agent_id
// @desc    gets an agent by their ID
// @access  public

router.get("/:agent_name", async (req, res) => {
  try {
    const agentName = req.params.agent_name;

    const fetchedAgent = await Agent.findOne({ agentName }).select("-password");

    if (!fetchedAgent) {
      return res.status(404).json({ msg: "Agent not found." });
    }

    res.status(200).json({ fetchedAgent });
  } catch (err) {
    console.log("Got here");
    errorTool.error400(err, res);
  }
});

module.exports = router;
