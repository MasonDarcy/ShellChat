const express = require("express");
const Agent = require("../models/Agent");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const auth = require("./helpers/middleware/auth");
const sessionSaver = require("./helpers/middleware/sessionSaver");
const errorTool = require("./helpers/errors/errors");
const router = express.Router();
const SALT_VAL = 10;
const { chat } = require("./helpers/sse/getEventEmitter");
const { getSetupSSE } = require("./helpers/sse/getSetupSSE");
const { setSSEHeaders } = require("./helpers/sse/sse-utility");
const {
  listenerTuples,
  onConnectTuples,
  onCloseTuples,
  onOpenFire,
  onCloseFire,
} = require("./helpers/sse/authSubscriptionData");

const setupSSE = getSetupSSE(
  chat,
  listenerTuples,
  onConnectTuples,
  onCloseTuples,
  onOpenFire,
  onCloseFire,
  Agent
);

// @route   post api/agents
// @desc    register agent
// @access  public
router.post(
  "/",
  [
    check("agentName", "Name is required.").not().isEmpty(),
    check("agentName", "User name exceeds maximum of 8 characters.").isLength({
      max: 8,
    }),
    check("password", "Password is required.").not().isEmpty(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(418).json({ errors: errors.array() });
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
      res.locals.agentID = newAgent.id;
      // res.status(201).json({ msg: "Agent created.", agent: newAgent });
      next();
    } catch (err) {
      errorTool.error400(err, res);
    }
  },
  sessionSaver
);

// @route   get api/agents/login
// @desc    Logs in an agent
// @access  public

router.post(
  "/login",
  [
    check("agentName", "Name is required.").not().isEmpty(),
    check("password", "Password is required.").not().isEmpty(),
  ],
  async (req, res, next) => {
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
    errorTool.error400(err, res);
  }
});

// @route   get api/agents/:agent_id
// @desc    gets an agent by their ID
// @access  public

router.get("/:agent_name", async (req, res) => {
  try {
    const agentName = req.params.agent_name;

    const fetchedAgent = await Agent.findOne({ agentName: agentName }).select(
      "-password"
    );

    if (!fetchedAgent) {
      return res.status(404).json({ msg: "Agent not found?!." });
    }

    res.status(200).json({ fetchedAgent });
  } catch (err) {
    errorTool.error400(err, res);
  }
});

// @route   GET api/agents/check
// @desc    checks if the agent still has a session token and sets their login status
// @access  private

router.get("/check/login", auth, async (req, res) => {
  try {
    let userID = req.session.userID;

    let agent = await Agent.findById(userID).select("-password");

    res.status(200).json({ agentName: agent.agentName });
  } catch (err) {
    errorTool.error400(err, res);
  }
});

//http://localhost:5000/api/agents/auth/connect
// @route   GET api/agents/auth/connect
// @desc    Keeps track of an agent's presence
// @access  private

router.get("/auth/connect/:agent_id", auth, setSSEHeaders, setupSSE);

module.exports = router;
