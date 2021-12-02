const getVerifyAgentExists = (Agent) => async (req, res, next) => {
  try {
    console.log("Got here");

    const { targetAgentID } = req.body;
    console.log(`targetAgentID: ${targetAgentID}`);
    const targetAgent = await Agent.findOne({
      agentName: targetAgentID,
    }).select("-password");
    console.log(targetAgent);

    if (!targetAgent) {
      console.log("verifyAgentExist/targetAgentID does not exist");

      return res.status(404).json({ msg: "Target agent does not exist." });
    } else {
      console.log("verifyAgentExist/targetAgentID does exist");
      res.locals.targetAgentID = targetAgentID;
      next();
    }
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ msg: err });
  }
};

module.exports = { getVerifyAgentExists };
